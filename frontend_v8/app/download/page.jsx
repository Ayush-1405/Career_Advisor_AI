'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function DownloadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const role = searchParams.get('role') || 'Career Report';

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      generateReportData();
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const generateReportData = () => {
    // Mock report data
    const mockData = {
      userInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        date: new Date().toLocaleDateString(),
        role: role || 'Career Report'
      },
      summary: {
        overallScore: 85,
        strengths: [
          'Strong technical foundation in modern web technologies',
          'Excellent problem-solving and analytical skills',
          'Good communication and collaboration abilities',
          'Proven track record of delivering quality projects'
        ],
        improvements: [
          'Develop leadership and mentoring capabilities',
          'Expand cloud computing and DevOps knowledge',
          'Strengthen system design and architecture skills',
          'Gain experience with machine learning technologies'
        ]
      },
      skillsProfile: {
        technical: [
          { name: 'JavaScript', level: 90, category: 'Programming' },
          { name: 'React', level: 85, category: 'Frontend' },
          { name: 'Node.js', level: 80, category: 'Backend' },
          { name: 'Python', level: 75, category: 'Programming' },
          { name: 'SQL', level: 70, category: 'Database' },
          { name: 'AWS', level: 65, category: 'Cloud' }
        ],
        soft: [
          { name: 'Problem Solving', level: 90 },
          { name: 'Communication', level: 85 },
          { name: 'Teamwork', level: 80 },
          { name: 'Leadership', level: 70 },
          { name: 'Time Management', level: 85 }
        ]
      },
      careerPath: {
        currentRole: 'Senior Software Engineer',
        targetRole: role || 'Technical Lead',
        timeline: '6-12 months',
        steps: [
          'Complete system design course',
          'Lead a cross-functional project',
          'Mentor junior developers',
          'Obtain cloud architecture certification',
          'Build leadership portfolio'
        ]
      },
      recommendations: [
        {
          category: 'Learning',
          items: [
            'Complete AWS Solutions Architect certification',
            'Take advanced system design course',
            'Practice technical interviewing',
            'Join leadership development program'
          ]
        },
        {
          category: 'Experience',
          items: [
            'Volunteer to lead next project',
            'Mentor 1-2 junior developers',
            'Present at team meetings',
            'Contribute to architecture decisions'
          ]
        },
        {
          category: 'Networking',
          items: [
            'Join local tech meetups',
            'Connect with industry leaders on LinkedIn',
            'Attend relevant conferences',
            'Participate in online communities'
          ]
        }
      ]
    };
    setReportData(mockData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, this would generate an actual PDF
      const pdfContent = `
        CAREER DEVELOPMENT REPORT
        
        Generated for: ${reportData.userInfo.name}
        Date: ${reportData.userInfo.date}
        Target Role: ${reportData.userInfo.role}
        
        EXECUTIVE SUMMARY
        Overall Career Readiness Score: ${reportData.summary.overallScore}%
        
        KEY STRENGTHS:
        ${reportData.summary.strengths.map(s => `• ${s}`).join('\n')}
        
        AREAS FOR IMPROVEMENT:
        ${reportData.summary.improvements.map(i => `• ${i}`).join('\n')}
        
        TECHNICAL SKILLS ASSESSMENT:
        ${reportData.skillsProfile.technical.map(s => `• ${s.name}: ${s.level}%`).join('\n')}
        
        CAREER PATH RECOMMENDATIONS:
        Current Role: ${reportData.careerPath.currentRole}
        Target Role: ${reportData.careerPath.targetRole}
        Timeline: ${reportData.careerPath.timeline}
        
        DEVELOPMENT STEPS:
        ${reportData.careerPath.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
        
        DETAILED RECOMMENDATIONS:
        ${reportData.recommendations.map(cat => 
          `${cat.category.toUpperCase()}:\n${cat.items.map(item => `• ${item}`).join('\n')}`
        ).join('\n\n')}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportData.userInfo.name}_Career_Report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 2000);
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
          <p className="text-gray-600 mb-6">You need to be logged in to download reports</p>
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
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Download Career Report</h1>
            <p className="text-gray-600">
              Generate and download your personalized career development report
            </p>
          </div>

          {reportData && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              {/* Report Preview */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Preview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Report Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{reportData.userInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Role:</span>
                        <span className="font-medium">{reportData.userInfo.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Generated:</span>
                        <span className="font-medium">{reportData.userInfo.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overall Score:</span>
                        <span className="font-medium text-green-600">{reportData.summary.overallScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Report Contents</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        Executive Summary
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        Skills Assessment
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        Career Path Recommendations
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        Learning Roadmap
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        Action Items
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <i className="ri-thumb-up-line text-green-600 mr-2"></i>
                    Top Strengths
                  </h3>
                  <ul className="text-sm space-y-1">
                    {reportData.summary.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <i className="ri-check-line text-green-600 mt-0.5 mr-2"></i>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <i className="ri-arrow-up-line text-blue-600 mr-2"></i>
                    Development Areas
                  </h3>
                  <ul className="text-sm space-y-1">
                    {reportData.summary.improvements.slice(0, 3).map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <i className="ri-arrow-right-line text-blue-600 mt-0.5 mr-2"></i>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Download Actions */}
              <div className="text-center">
                <button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap mr-4"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating PDF...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <i className="ri-download-line mr-2"></i>
                      Download PDF Report
                    </div>
                  )}
                </button>
                <Link href="/suggestions" className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap">
                  Back to Suggestions
                </Link>
              </div>
            </div>
          )}

          {/* Report Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-text-line text-blue-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
              <p className="text-sm text-gray-600">Detailed insights into your skills, experience, and career potential</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-roadmap-line text-green-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Actionable Roadmap</h3>
              <p className="text-sm text-gray-600">Clear steps and recommendations for your career development</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-purple-600 text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Format</h3>
              <p className="text-sm text-gray-600">Professionally formatted report suitable for sharing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}