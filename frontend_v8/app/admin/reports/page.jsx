'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminReportsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    // Check if admin is logged in
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsedAuth = JSON.parse(adminAuth);
      if (parsedAuth.user.role === 'ADMIN') {
        setAdmin(parsedAuth.user);
        loadReports();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router, selectedPeriod]);

  const loadReports = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/admin/reports/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        setError('Failed to load reports');
      }
    } catch (error) {
      setError('Error loading reports');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async (format) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/api/admin/reports/export?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-report-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Failed to export report');
      }
    } catch (error) {
      setError('Error exporting report');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('authToken');
    setAdmin(null);
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-lock-line text-red-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page</p>
          <Link href="/admin/login" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
            Admin Login
          </Link>
        </div>
      </div>
    );
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
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-red-600 transition-colors font-semibold cursor-pointer">Dashboard</Link>
              <Link href="/admin/manage" className="text-gray-700 hover:text-red-600 transition-colors font-semibold cursor-pointer">Manage Users</Link>
              <Link href="/admin/resumes" className="text-gray-700 hover:text-red-600 transition-colors font-semibold cursor-pointer">Resumes</Link>
              <Link href="/admin/career-paths" className="text-gray-700 hover:text-red-600 transition-colors font-semibold cursor-pointer">Career Paths</Link>
              <Link href="/admin/analytics" className="text-gray-700 hover:text-red-600 font-semibold cursor-pointer">Analytics</Link>
              <Link href="/admin/reports" className="text-red-600 transition-colors font-semibold cursor-pointer">Reports</Link>
              <Link href="/admin/settings" className="text-gray-700 hover:text-red-600 transition-colors font-semibold cursor-pointer">Settings</Link>
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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights and data analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <i className="ri-file-pdf-line mr-2"></i>
                  Export PDF
                </button>
                <button
                  onClick={() => handleExportReport('csv')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <i className="ri-file-excel-line mr-2"></i>
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-red-600 mr-2"></i>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          {reports && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{reports.totalUsers?.toLocaleString() || 0}</div>
                    <div className="text-sm text-gray-500">Total Users</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-green-600">+{reports.newUsersThisMonth || 0}</span> new this month
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-check-line text-green-600 text-xl"></i>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{reports.activeUsers?.toLocaleString() || 0}</div>
                    <div className="text-sm text-gray-500">Active Users</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {reports.totalUsers > 0 ? ((reports.activeUsers / reports.totalUsers) * 100).toFixed(1) : 0}% of total
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-file-text-line text-purple-600 text-xl"></i>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{reports.totalResumes?.toLocaleString() || 0}</div>
                    <div className="text-sm text-gray-500">Resumes Processed</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {reports.totalAnalyses || 0} analyses completed
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-star-line text-yellow-600 text-xl"></i>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{reports.averageResumeScore?.toFixed(1) || 0}</div>
                    <div className="text-sm text-gray-500">Avg Resume Score</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Out of 100 points
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* User Growth Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration Trends</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-line-chart-line text-gray-400 text-4xl mb-2"></i>
                  <p className="text-gray-500">User growth chart</p>
                  <p className="text-sm text-gray-400">Monthly registration data</p>
                </div>
              </div>
            </div>

            {/* Role Distribution Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-pie-chart-line text-gray-400 text-4xl mb-2"></i>
                  <p className="text-gray-500">Role distribution chart</p>
                  <p className="text-sm text-gray-400">Admin vs User breakdown</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Reports */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Recent User Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activities</h3>
              <div className="space-y-4">
                {reports?.userActivities?.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="ri-user-line text-red-600 text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.userName}</div>
                      <div className="text-sm text-gray-500">{activity.activityType}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-activity-line text-gray-400 text-2xl"></i>
                    </div>
                    <div className="text-gray-500">No recent activities</div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume Analysis Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Analysis Summary</h3>
              <div className="space-y-4">
                {reports?.resumeAnalyses?.slice(0, 5).map((analysis, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="ri-file-text-line text-purple-600 text-lg"></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{analysis.userName}</div>
                      <div className="text-sm text-gray-500">Score: {analysis.overallScore?.toFixed(1) || 'N/A'}/100</div>
                      <div className="text-xs text-gray-400">
                        {new Date(analysis.analyzedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-file-text-line text-gray-400 text-2xl"></i>
                    </div>
                    <div className="text-gray-500">No resume analyses yet</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* User Registration by Month */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Registration by Month</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Users</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports?.userRegistrationsByMonth ? Object.entries(reports.userRegistrationsByMonth).map(([month, count]) => (
                      <tr key={month}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{month}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{count}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h3>
              <div className="space-y-4">
                {reports?.roleDistribution ? Object.entries(reports.roleDistribution).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        role === 'ADMIN' ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                      <span className="font-medium text-gray-900">{role}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{count}</span>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-user-settings-line text-gray-400 text-2xl"></i>
                    </div>
                    <div className="text-gray-500">No role data available</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* System Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-server-line text-green-600 text-2xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">98.5%</div>
                <div className="text-sm text-gray-500">System Uptime</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-blue-600 text-2xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">2.3s</div>
                <div className="text-sm text-gray-500">Avg Response Time</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-database-2-line text-purple-600 text-2xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-500">Data Accuracy</div>
              </div>
            </div>
          </div>

          {/* Report Generation Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Report Generated</h4>
                <p className="text-gray-600">
                  {reports?.generatedAt ? new Date(reports.generatedAt).toLocaleString() : 'Just now'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Data includes all users and activities</p>
                <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
             