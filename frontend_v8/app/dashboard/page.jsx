'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    resumeUploaded: true,
    suggestionsAvailable: 12,
    skillsAssessed: true,
    completionRate: 85
  });

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-lock-line text-red-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the dashboard</p>
          <Link href="/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
            Sign In
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
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-brain-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerPath AI</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/analyze" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Resume Analyzer</Link>
              <Link href="/suggestions" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Career Suggestions</Link>
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-blue-600 font-semibold cursor-pointer">Dashboard</Link>
              <Link href="/ai-assistant" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">AI Assistant</Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-blue-600"></i>
                  </div>
                  <span className="text-gray-700">{user.name}</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-blue-100">Ready to advance your career? Let's explore your options.</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-user-star-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-line text-green-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.resumeUploaded ? '1' : '0'}
                  </div>
                  <div className="text-sm text-gray-500">Resume Uploaded</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {stats.resumeUploaded ? 'Resume analyzed successfully' : 'Upload your resume'}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-lightbulb-line text-blue-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.suggestionsAvailable}</div>
                  <div className="text-sm text-gray-500">Suggestions Available</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Career recommendations ready
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-brain-line text-purple-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.skillsAssessed ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-500">Skills Assessed</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {stats.skillsAssessed ? 'Assessment completed' : 'Take assessment'}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-line text-orange-600 text-xl"></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
                  <div className="text-sm text-gray-500">Profile Complete</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Almost there! Complete your profile
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/analyze" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <i className="ri-upload-cloud-2-line text-white text-2xl"></i>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600">Analyze your resume and get personalized insights</p>
            </Link>

            <Link href="/suggestions" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <i className="ri-compass-3-line text-white text-2xl"></i>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">View Suggestions</h3>
              <p className="text-gray-600">Explore career paths tailored to your skills</p>
            </Link>

            <Link href="/ai-assistant" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <i className="ri-robot-line text-white text-2xl"></i>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ask AI Assistant</h3>
              <p className="text-gray-600">Get instant career advice and guidance</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Resume uploaded successfully</div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-brain-line text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Skills assessment completed</div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-lightbulb-line text-purple-600"></i>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">New career suggestions available</div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}