'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CareerPathDetail({ pathId }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [careerPath, setCareerPath] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadCareerPath();
    setIsLoading(false);
  }, [pathId]);

  const loadCareerPath = () => {
    const mockCareerPaths = {
      '1': {
        id: 1,
        title: 'Software Engineer',
        category: 'Technology',
        level: 'Entry to Senior',
        description: 'Software Engineers design, develop, and maintain software applications using various programming languages and frameworks. They work on everything from web applications to mobile apps and enterprise systems.',
        averageSalary: '$75,000 - $150,000',
        growth: '+22%',
        popularity: 95,
        requiredSkills: ['Programming', 'Problem Solving', 'Version Control', 'Testing', 'Debugging', 'Agile/Scrum'],
        keyResponsibilities: [
          'Write clean, efficient, and maintainable code',
          'Debug and troubleshoot applications',
          'Collaborate with cross-functional teams',
          'Participate in code reviews and technical discussions',
          'Design and implement software solutions',
          'Write and maintain technical documentation'
        ],
        careerProgression: [
          { level: 'Junior Developer', salary: '$60,000 - $80,000', experience: '0-2 years', description: 'Learn fundamentals and work on simple features' },
          { level: 'Mid-Level Developer', salary: '$80,000 - $120,000', experience: '2-5 years', description: 'Handle complex features and mentor juniors' },
          { level: 'Senior Developer', salary: '$120,000 - $180,000', experience: '5+ years', description: 'Lead technical decisions and architecture' },
          { level: 'Tech Lead', salary: '$150,000 - $200,000', experience: '7+ years', description: 'Manage team and set technical direction' }
        ],
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb'],
        education: 'Bachelor\'s in Computer Science or related field',
        dailyTasks: [
          'Review and write code',
          'Attend team meetings and standups',
          'Collaborate with designers and product managers',
          'Test and debug applications',
          'Research new technologies',
          'Participate in code reviews'
        ],
        workEnvironment: 'Most software engineers work in office environments or remotely. The work involves significant computer time and collaboration with team members.',
        jobOutlook: 'Excellent job prospects with 22% growth expected over the next decade, much faster than average for all occupations.',
        learningPath: [
          { step: 1, title: 'Learn Programming Fundamentals', duration: '3-6 months', description: 'Master a programming language like Python, JavaScript, or Java' },
          { step: 2, title: 'Build Projects', duration: '6-12 months', description: 'Create portfolio projects to demonstrate skills' },
          { step: 3, title: 'Learn Frameworks', duration: '3-6 months', description: 'Study popular frameworks like React, Node.js, or Django' },
          { step: 4, title: 'Practice System Design', duration: '6-12 months', description: 'Understand how to design scalable systems' },
          { step: 5, title: 'Gain Experience', duration: 'Ongoing', description: 'Work on real projects and continue learning' }
        ],
        certifications: [
          'AWS Certified Developer',
          'Microsoft Certified: Azure Developer',
          'Google Cloud Professional Developer',
          'Oracle Certified Professional Java SE'
        ],
        image: 'https://readdy.ai/api/search-image?query=Professional%20software%20engineer%20working%20on%20computer%20coding%20programming%20modern%20office%20environment%20with%20multiple%20monitors%20clean%20workspace%20technology%20atmosphere%20detailed%20view&width=800&height=400&seq=sw-eng-detail-1&orientation=landscape'
      },
      '2': {
        id: 2,
        title: 'Data Scientist',
        category: 'Analytics',
        level: 'Mid to Senior',
        description: 'Data Scientists analyze complex data sets to extract meaningful insights and drive business decisions using statistical methods, machine learning, and advanced analytics techniques.',
        averageSalary: '$90,000 - $160,000',
        growth: '+35%',
        popularity: 88,
        requiredSkills: ['Python/R', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL', 'Mathematics'],
        keyResponsibilities: [
          'Analyze large datasets to identify trends and patterns',
          'Build predictive models and algorithms',
          'Create data visualizations and dashboards',
          'Present findings to stakeholders',
          'Collaborate with engineering teams to implement models',
          'Design experiments and A/B tests'
        ],
        careerProgression: [
          { level: 'Data Analyst', salary: '$70,000 - $90,000', experience: '0-2 years', description: 'Analyze data and create reports' },
          { level: 'Data Scientist', salary: '$90,000 - $130,000', experience: '2-5 years', description: 'Build models and derive insights' },
          { level: 'Senior Data Scientist', salary: '$130,000 - $180,000', experience: '5+ years', description: 'Lead data science projects' },
          { level: 'Principal Data Scientist', salary: '$180,000 - $250,000', experience: '8+ years', description: 'Drive data strategy and innovation' }
        ],
        topCompanies: ['Netflix', 'Spotify', 'Uber', 'Airbnb', 'Tesla', 'LinkedIn', 'Pinterest', 'Shopify'],
        education: 'Master\'s in Data Science, Statistics, Mathematics, or related field',
        dailyTasks: [
          'Clean and preprocess data',
          'Perform statistical analysis',
          'Build and train machine learning models',
          'Create visualizations and reports',
          'Collaborate with business teams',
          'Present insights to stakeholders'
        ],
        workEnvironment: 'Data Scientists typically work in collaborative environments with access to powerful computing resources and large datasets.',
        jobOutlook: 'Outstanding growth prospects with 35% expected growth, driven by increasing demand for data-driven insights.',
        learningPath: [
          { step: 1, title: 'Master Statistics and Math', duration: '6-12 months', description: 'Build strong foundation in statistics and linear algebra' },
          { step: 2, title: 'Learn Programming', duration: '3-6 months', description: 'Master Python or R for data analysis' },
          { step: 3, title: 'Study Machine Learning', duration: '6-12 months', description: 'Learn ML algorithms and techniques' },
          { step: 4, title: 'Practice on Real Data', duration: '6-12 months', description: 'Work on projects with real datasets' },
          { step: 5, title: 'Specialize', duration: 'Ongoing', description: 'Focus on specific domains like NLP or computer vision' }
        ],
        certifications: [
          'Google Data Analytics Certificate',
          'IBM Data Science Professional Certificate',
          'Microsoft Certified: Azure Data Scientist',
          'SAS Certified Data Scientist'
        ],
        image: 'https://readdy.ai/api/search-image?query=Data%20scientist%20analyzing%20complex%20charts%20graphs%20statistical%20models%20on%20multiple%20computer%20screens%20with%20machine%20learning%20algorithms%20modern%20analytics%20office%20environment%20professional%20workspace%20detailed%20view&width=800&height=400&seq=data-sci-detail-1&orientation=landscape'
      }
    };

    const path = mockCareerPaths[pathId];
    if (path) {
      setCareerPath(path);
    }
  };

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

  if (!careerPath) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-red-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Path Not Found</h2>
          <p className="text-gray-600 mb-6">The career path you're looking for doesn't exist</p>
          <Link href="/career-paths" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
            Back to Career Paths
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
              <Link href="/career-paths" className="text-blue-600 font-semibold cursor-pointer">Career Paths</Link>
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
              <Link href="/ai-assistant" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">AI Assistant</Link>
              {user ? (
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
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">Sign In</Link>
                  <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link href="/career-paths" className="text-gray-600 hover:text-blue-600 cursor-pointer">Career Paths</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">{careerPath.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  src={careerPath.image} 
                  alt={careerPath.title}
                  className="h-48 w-full object-cover md:h-full md:w-96"
                />
              </div>
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{careerPath.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{careerPath.category}</span>
                      <span>{careerPath.level}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{careerPath.averageSalary}</div>
                    <div className="text-sm text-gray-500">Average Salary</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{careerPath.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{careerPath.growth}</div>
                    <div className="text-xs text-gray-500">Job Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{careerPath.popularity}%</div>
                    <div className="text-xs text-gray-500">Popularity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">{careerPath.topCompanies.length}+</div>
                    <div className="text-xs text-gray-500">Top Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              {['overview', 'progression', 'learning', 'companies'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {careerPath.keyResponsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start">
                          <i className="ri-check-line text-green-600 mt-1 mr-2"></i>
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {careerPath.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Tasks</h3>
                    <ul className="space-y-2">
                      {careerPath.dailyTasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <i className="ri-time-line text-blue-600 mt-1 mr-2"></i>
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Environment</h3>
                    <p className="text-gray-700 mb-4">{careerPath.workEnvironment}</p>
                    <h4 className="font-medium text-gray-900 mb-2">Job Outlook</h4>
                    <p className="text-gray-700">{careerPath.jobOutlook}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progression' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Career Progression Path</h3>
                <div className="space-y-4">
                  {careerPath.careerProgression.map((stage, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold text-gray-900">{stage.level}</h4>
                        <span className="text-lg font-bold text-green-600">{stage.salary}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i>
                          {stage.experience}
                        </span>
                      </div>
                      <p className="text-gray-700">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Learning Path</h3>
                <div className="space-y-4">
                  {careerPath.learningPath.map((step, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                          <div className="text-sm text-blue-600 mb-2">{step.duration}</div>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Certifications</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {careerPath.certifications.map((cert, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <i className="ri-award-line text-green-600 mr-2"></i>
                          <span className="text-gray-900 font-medium">{cert}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Companies Hiring</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {careerPath.topCompanies.map((company, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="ri-building-line text-blue-600"></i>
                      </div>
                      <span className="text-gray-900 font-medium">{company}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Education Requirements</h4>
                  <p className="text-gray-700">{careerPath.education}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/analyze" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Analyze My Resume
              </Link>
              <Link href="/skills" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
                Take Skills Assessment
              </Link>
              <Link href="/ai-assistant" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                Get AI Guidance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}