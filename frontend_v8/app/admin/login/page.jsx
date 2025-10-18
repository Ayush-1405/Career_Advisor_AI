'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { apiRequest } from '../../../lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Clear any existing tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminAuth');

      // Send login request
     const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});


      // Handle response errors
      if (response.status === 401) {
        setError('Invalid email or password. Please try again.');
        return;
      } else if (response.status === 403) {
        setError('You do not have permission to access the admin portal.');
        return;
      } else if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {}
        setError(errorMessage);
        return;
      }

      const data = await response.json();

      // Validate role
      if (!data.role || data.role.toUpperCase() !== 'ADMIN') {
        setError('Access denied. Admin privileges required.');
        return;
      }

      // Store token and session
      //const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours
      const adminAuth = {
        user: {
          id: data.userId || 'unknown',
          name: data.name,
          email: data.email,
          role: data.role,
          permissions: ['read', 'write', 'delete', 'manage_users']
        },
        token: data.token,
        
        //expiresAt: expiresAt.toISOString()
      };

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('adminAuth', JSON.stringify(adminAuth));

      router.push('/admin/dashboard');


    } catch (error) {
      console.error('Admin login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <i className="ri-shield-user-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Admin Portal
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">
                Back to Main Site
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">
                User Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-admin-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
              <p className="text-gray-600">Access the administrative dashboard</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 mr-2"></i>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying Credentials...
                  </div>
                ) : (
                  'Access Admin Dashboard'
                )}
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Demo Credentials</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Email: admin@careerpathai.com</div>
                <div>Password: admin123</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/contact" className="text-gray-600 hover:text-red-600 cursor-pointer">
                Need admin access? Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
