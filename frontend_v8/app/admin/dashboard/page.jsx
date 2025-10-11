'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAdminDashboardStats } from '../../../lib/api';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    resumesParsed: 0,
    activeUsers: 0,
    newUsersToday: 0,
    successfulLogins: 0,
    verificationRate: 0,
    completionRate: 0,
    systemUptime: 98.5,
    recentActivities: []
  });

  useEffect(() => {
  const adminAuth = localStorage.getItem('admin');
  if (!adminAuth) {
    router.push('/admin/login');
    return;
  }

  const parsedAuth = JSON.parse(adminAuth);
  if (parsedAuth.user.role !== 'admin') {
    router.push('/admin/login');
    return;
  }

  setAdmin(parsedAuth.user);
  loadDashboardData();
}, [router]);


  const loadDashboardData = async () => {
    try {
      const data = await fetchAdminDashboardStats();
      setStats({
        totalUsers: data.totalUsers || 0,
        verifiedUsers: data.verifiedUsers || 0,
        resumesParsed: data.resumesParsed || 0,
        activeUsers: data.activeUsers || 0,
        newUsersToday: data.newUsersToday || 0,
        successfulLogins: data.successfulLogins || 0,
        verificationRate: data.verificationRate || 0,
        completionRate: data.completionRate || 0,
        systemUptime: data.systemUptime || 98.5,
        recentActivities: data.recentActivities || []
      });
    } catch (error) {
      console.error('Failed to load admin dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  function handleLogout() {
  localStorage.removeItem('auth');   // Remove token
  localStorage.removeItem('admin');   // Optional: remove admin info
  router.push('/auth/login');        // Redirect to login page
}

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return `${hours} hours ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
          <p className="text-gray-600 mb-6">You need admin privileges to access this dashboard</p>
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
              <Link href="/admin/dashboard" className="text-red-600 font-semibold cursor-pointer">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Users</Link>
              <Link href="/admin/resumes" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Resumes</Link>
              <Link href="/admin/analytics" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Analytics</Link>
              <Link href="/admin/settings" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Settings</Link>
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
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {admin.name}!</h1>
                <p className="text-red-100">Monitor and manage your CareerPath AI platform</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-dashboard-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-line text-blue-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-600">+{stats.newUsersToday}</span> new today
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-verified-badge-line text-green-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.verifiedUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Verified Users</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {stats.verificationRate.toFixed(1)}% verification rate
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-line text-purple-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.resumesParsed.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Resumes Parsed</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {stats.completionRate.toFixed(1)}% completion rate
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-star-line text-yellow-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Online in last 24 hours
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <i className="ri-login-box-line text-indigo-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.successfulLogins.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Successful Logins</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                This month
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-line text-red-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.systemUptime.toFixed(1)}%</div>
                  <div className="text-sm text-gray-500">System Uptime</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Last 30 days
              </div>
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-line-chart-line text-gray-400 text-4xl mb-2"></i>
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Integration with Chart.js or Recharts</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Analytics</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-pie-chart-line text-gray-400 text-4xl mb-2"></i>
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Resume parsing success rates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {stats.recentActivities.length > 0 ? (
                stats.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className={`${activity.icon} ${activity.color} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.message}</div>
                      <div className="text-sm text-gray-500">{activity.timestamp}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-activity-line text-gray-400 text-2xl"></i>
                  </div>
                  <div className="text-gray-500">No recent activity</div>
                  <div className="text-sm text-gray-400 mt-1">Activity will appear here as users interact with the platform</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <Link href="/admin/users" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-team-line text-blue-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Manage Users</h4>
              </div>
            </Link>

            <Link href="/admin/resumes" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-list-line text-green-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900">View Resumes</h4>
              </div>
            </Link>

            <Link href="/admin/analytics" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-bar-chart-box-line text-purple-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Analytics</h4>
              </div>
            </Link>

            <Link href="/admin/settings" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-settings-line text-red-600 text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900">Settings</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}