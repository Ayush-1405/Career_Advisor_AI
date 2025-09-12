'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminAnalytics } from '../../../lib/api';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState({
    totals: { users: 0, resumes: 0, active: 0, premium: 0 },
    dailyActiveUsers: [],
    resumeStatuses: { processed: 0, processing: 0, error: 0 },
    topCareers: [],
    signupsBySource: []
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsed = JSON.parse(adminAuth);
      if (parsed.user.role === 'admin') {
        setAdmin(parsed.user);
        loadAnalytics();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadAnalytics = async () => {
    try {
      const data = await fetchAdminAnalytics();
      setAnalytics({
        totals: data.totals || analytics.totals,
        dailyActiveUsers: data.dailyActiveUsers || analytics.dailyActiveUsers,
        resumeStatuses: data.resumeStatuses || analytics.resumeStatuses,
        topCareers: data.topCareers || analytics.topCareers,
        signupsBySource: data.signupsBySource || analytics.signupsBySource
      });
    } catch (e) {
      setError(e.message || 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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
              <Link href="/admin/analytics" className="text-red-600 font-semibold cursor-pointer">Analytics</Link>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Platform usage, growth, and performance metrics</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-red-600 mr-2"></i>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Kpi title="Total Users" value={analytics.totals.users} icon="ri-user-line" color="text-blue-600" bg="bg-blue-100" />
            <Kpi title="Active Users" value={analytics.totals.active} icon="ri-user-star-line" color="text-yellow-600" bg="bg-yellow-100" />
            <Kpi title="Resumes Parsed" value={analytics.totals.resumes} icon="ri-file-text-line" color="text-purple-600" bg="bg-purple-100" />
            <Kpi title="Premium Users" value={analytics.totals.premium} icon="ri-vip-crown-line" color="text-red-600" bg="bg-red-100" />
          </div>

          {/* Charts placeholders (UI only; plug a chart lib later) */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Daily Active Users">
              <ChartPlaceholder subtitle="DAU for last 14 days" />
            </ChartCard>
            <ChartCard title="Resume Processing Status">
              <ChartPlaceholder subtitle={`Processed: ${analytics.resumeStatuses.processed}, Processing: ${analytics.resumeStatuses.processing}, Error: ${analytics.resumeStatuses.error}`} />
            </ChartCard>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Top Career Paths">
              <ul className="space-y-2">
                {analytics.topCareers.map((c, i) => (
                  <li key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-gray-700">{c.name}</span>
                    <span className="text-gray-900 font-medium">{c.count}</span>
                  </li>
                ))}
                {analytics.topCareers.length === 0 && (
                  <div className="text-sm text-gray-500">No data</div>
                )}
              </ul>
            </ChartCard>
            <ChartCard title="Signups by Source">
              <ul className="space-y-2">
                {analytics.signupsBySource.map((s, i) => (
                  <li key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-gray-700">{s.source}</span>
                    <span className="text-gray-900 font-medium">{s.count}</span>
                  </li>
                ))}
                {analytics.signupsBySource.length === 0 && (
                  <div className="text-sm text-gray-500">No data</div>
                )}
              </ul>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value, icon, color, bg }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} ${color} text-xl`}></i>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{Number(value).toLocaleString()}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ChartPlaceholder({ subtitle }) {
  return (
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <i className="ri-bar-chart-box-line text-gray-400 text-4xl mb-2"></i>
        <p className="text-gray-500">Chart visualization placeholder</p>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}



