'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuggestionsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      loadSuggestions();
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const loadSuggestions = () => {
    // Mock career suggestions data
    const mockSuggestions = [
      {
        id: 1,
        role: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        industry: 'Technology',
        match: 95,
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        salary: '$90,000 - $120,000',
        description: 'Lead development of scalable web applications using modern technologies',
        requirements: ['5+ years experience', 'Strong JavaScript skills', 'Cloud experience'],
        roadmap: ['Advanced React patterns', 'System design', 'Leadership skills']
      },
      {
        id: 2,
        role: 'Technical Lead',
        company: 'Innovation Labs',
        industry: 'Technology',
        match: 88,
        skills: ['Leadership', 'Architecture', 'Mentoring', 'Python'],
        salary: '$100,000 - $140,000',
        description: 'Guide technical decisions and mentor development teams',
        requirements: ['7+ years experience', 'Team leadership', 'Technical architecture'],
        roadmap: ['Team management', 'Strategic planning', 'Technical communication']
      },
      {
        id: 3,
        role: 'Product Manager',
        company: 'StartupXYZ',
        industry: 'Technology',
        match: 78,
        skills: ['Product Strategy', 'Analytics', 'Communication', 'Agile'],
        salary: '$85,000 - $115,000',
        description: 'Drive product vision and coordinate cross-functional teams',
        requirements: ['3+ years experience', 'Product management', 'Analytics'],
        roadmap: ['Product strategy', 'Market research', 'Stakeholder management']
      },
      {
        id: 4,
        role: 'Data Scientist',
        company: 'DataTech Solutions',
        industry: 'Analytics',
        match: 72,
        skills: ['Machine Learning', 'Python', 'Statistics', 'SQL'],
        salary: '$80,000 - $110,000',
        description: 'Extract insights from complex datasets to drive business decisions',
        requirements: ['Statistics background', 'ML experience', 'Programming skills'],
        roadmap: ['Advanced ML algorithms', 'Big data technologies', 'Domain expertise']
      },
      {
        id: 5,
        role: 'UX Designer',
        company: 'Creative Agency',
        industry: 'Design',
        match: 65,
        skills: ['User Research', 'Prototyping', 'Figma', 'Design Systems'],
        salary: '$70,000 - $95,000',
        description: 'Create intuitive user experiences for digital products',
        requirements: ['Design portfolio', 'User research', 'Prototyping tools'],
        roadmap: ['Advanced prototyping', 'User psychology', 'Design leadership']
      },
      {
        id: 6,
        role: 'DevOps Engineer',
        company: 'CloudFirst Inc.',
        industry: 'Technology',
        match: 82,
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
        salary: '$85,000 - $115,000',
        description: 'Streamline development and deployment processes',
        requirements: ['Cloud platforms', 'Containerization', 'Automation'],
        roadmap: ['Container orchestration', 'Infrastructure as code', 'Monitoring']
      }
    ];
    setSuggestions(mockSuggestions);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const sortedAndFilteredSuggestions = suggestions
    .filter(suggestion => filterBy === 'all' || suggestion.industry.toLowerCase().includes(filterBy))
    .sort((a, b) => {
      if (sortBy === 'match') return b.match - a.match;
      if (sortBy === 'salary') return b.salary.localeCompare(a.salary);
      return a.role.localeCompare(b.role);
    });

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
          <p className="text-gray-600 mb-6">You need to be logged in to view career suggestions</p>
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
              <Link href="/suggestions" className="text-blue-600 font-semibold cursor-pointer">Career Suggestions</Link>
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Suggestions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore personalized career recommendations based on your skills, experience, and preferences
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  >
                    <option value="match">Match Score</option>
                    <option value="salary">Salary</option>
                    <option value="role">Role Name</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Industry</label>
                  <select 
                    value={filterBy} 
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  >
                    <option value="all">All Industries</option>
                    <option value="technology">Technology</option>
                    <option value="analytics">Analytics</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-information-line text-blue-600"></i>
                <span className="text-sm text-gray-600">{sortedAndFilteredSuggestions.length} suggestions found</span>
              </div>
            </div>
          </div>

          {/* Suggestions Grid */}
          <div className="grid gap-6">
            {sortedAndFilteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{suggestion.role}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {suggestion.industry}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-3">
                        <i className="ri-building-line"></i>
                        <span>{suggestion.company}</span>
                        <span>•</span>
                        <i className="ri-money-dollar-circle-line"></i>
                        <span>{suggestion.salary}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{suggestion.description}</p>
                    </div>
                    <div className="text-center ml-6">
                      <div className="text-3xl font-bold text-green-600">{suggestion.match}%</div>
                      <div className="text-sm text-gray-500">Match</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.skills.map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {suggestion.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-check-line text-green-600 mr-1 mt-0.5"></i>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Growth Path</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {suggestion.roadmap.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-arrow-right-line text-blue-600 mr-1 mt-0.5"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${suggestion.match}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">Match Score</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link 
                        href={`/download?role=${encodeURIComponent(suggestion.role)}`}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Download Report
                      </Link>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                        View Roadmap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/analyze" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer text-center whitespace-nowrap">
              Upload New Resume
            </Link>
            <Link href="/skills" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer text-center whitespace-nowrap">
              Retake Skills Assessment
            </Link>
            <Link href="/ai-assistant" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer text-center whitespace-nowrap">
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}