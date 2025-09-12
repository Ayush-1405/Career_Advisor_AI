'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../lib/api';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    siteName: '',
    allowRegistrations: true,
    requireEmailVerification: true,
    resumeMaxSizeMb: 10,
    supportedFormats: 'pdf, doc, docx',
    aiAssistantEnabled: true
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsed = JSON.parse(adminAuth);
      if (parsed.user.role === 'admin') {
        setAdmin(parsed.user);
        loadSettings();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadSettings = async () => {
    try {
      const data = await fetchAdminSettings();
      setSettings({
        siteName: data.siteName ?? settings.siteName,
        allowRegistrations: data.allowRegistrations ?? settings.allowRegistrations,
        requireEmailVerification: data.requireEmailVerification ?? settings.requireEmailVerification,
        resumeMaxSizeMb: data.resumeMaxSizeMb ?? settings.resumeMaxSizeMb,
        supportedFormats: data.supportedFormats?.join?.(', ') ?? settings.supportedFormats,
        aiAssistantEnabled: data.aiAssistantEnabled ?? settings.aiAssistantEnabled
      });
    } catch (e) {
      setError(e.message || 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        siteName: settings.siteName,
        allowRegistrations: settings.allowRegistrations,
        requireEmailVerification: settings.requireEmailVerification,
        resumeMaxSizeMb: Number(settings.resumeMaxSizeMb),
        supportedFormats: settings.supportedFormats.split(',').map(s => s.trim()).filter(Boolean),
        aiAssistantEnabled: settings.aiAssistantEnabled
      };
      await updateAdminSettings(payload);
      setSuccess('Settings saved successfully');
    } catch (e) {
      setError(e.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <i className="ri-shield-user-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Admin Portal</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Users</Link>
              <Link href="/admin/resumes" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Resumes</Link>
              <Link href="/admin/analytics" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Analytics</Link>
              <Link href="/admin/settings" className="text-red-600 font-semibold cursor-pointer">Settings</Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <i className="ri-admin-line text-red-600"></i>
                  </div>
                  <span className="text-gray-700">{admin.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <i className="ri-logout-box-r-line"></i>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure platform preferences and restrictions</p>
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

          <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">General</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="CareerPath AI"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="allowRegistrations"
                    type="checkbox"
                    name="allowRegistrations"
                    checked={settings.allowRegistrations}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="allowRegistrations" className="ml-2 text-sm text-gray-700">Allow new user registrations</label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h2>
              <div className="flex items-center">
                <input
                  id="requireEmailVerification"
                  type="checkbox"
                  name="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="requireEmailVerification" className="ml-2 text-sm text-gray-700">Require email verification for new accounts</label>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Analyzer</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                  <input
                    type="number"
                    name="resumeMaxSizeMb"
                    value={settings.resumeMaxSizeMb}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="1"
                    max="50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supported Formats (comma-separated)</label>
                  <input
                    type="text"
                    name="supportedFormats"
                    value={settings.supportedFormats}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="pdf, doc, docx"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Assistant</h2>
              <div className="flex items-center">
                <input
                  id="aiAssistantEnabled"
                  type="checkbox"
                  name="aiAssistantEnabled"
                  checked={settings.aiAssistantEnabled}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="aiAssistantEnabled" className="ml-2 text-sm text-gray-700">Enable AI Assistant</label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



