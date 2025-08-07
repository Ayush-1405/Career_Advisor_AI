'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setSuccess('Password reset successfully! You can now log in with your new password.');
      setFormData({ password: '', confirmPassword: '' });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
      setIsLoading(false);
    }, 1500);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let score = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    score = checks.filter(Boolean).length;
    
    if (score < 3) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (score < 4) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (score < 5) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-brain-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerPath AI</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Sign In</Link>
              <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-lock-password-line text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
              <p className="text-gray-600">
                Enter your new password below
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 mr-2"></i>
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span className="text-green-700">{success}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                  required
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Password strength</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength.strength === 100 ? 'text-green-600' :
                        passwordStrength.strength >= 75 ? 'text-blue-600' :
                        passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <i className={`ri-${formData.password.length >= 8 ? 'check' : 'close'}-line mr-2 ${
                      formData.password.length >= 8 ? 'text-green-600' : 'text-red-600'
                    }`}></i>
                    At least 8 characters
                  </li>
                  <li className="flex items-center">
                    <i className={`ri-${/[A-Z]/.test(formData.password) ? 'check' : 'close'}-line mr-2 ${
                      /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                    }`}></i>
                    One uppercase letter
                  </li>
                  <li className="flex items-center">
                    <i className={`ri-${/[a-z]/.test(formData.password) ? 'check' : 'close'}-line mr-2 ${
                      /[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                    }`}></i>
                    One lowercase letter
                  </li>
                  <li className="flex items-center">
                    <i className={`ri-${/\d/.test(formData.password) ? 'check' : 'close'}-line mr-2 ${
                      /\d/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                    }`}></i>
                    One number
                  </li>
                  <li className="flex items-center">
                    <i className={`ri-${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'check' : 'close'}-line mr-2 ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-red-600'
                    }`}></i>
                    One special character
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 cursor-pointer">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}