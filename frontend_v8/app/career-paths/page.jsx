'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CareerPathsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [careerPaths, setCareerPaths] = useState([]);
  const [filteredPaths, setFilteredPaths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadCareerPaths();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    filterAndSortPaths();
  }, [selectedCategory, searchTerm, sortBy, careerPaths]);

  const loadCareerPaths = () => {
    const mockCareerPaths = [
      {
        id: 1,
        title: 'Software Engineer',
        category: 'Technology',
        level: 'Entry to Senior',
        description: 'Design, develop, and maintain software applications using various programming languages and frameworks.',
        averageSalary: '$75,000 - $150,000',
        growth: '+22%',
        popularity: 95,
        requiredSkills: ['Programming', 'Problem Solving', 'Version Control', 'Testing'],
        keyResponsibilities: [
          'Write clean, efficient code',
          'Debug and troubleshoot applications',
          'Collaborate with cross-functional teams',
          'Participate in code reviews'
        ],
        careerProgression: [
          { level: 'Junior Developer', salary: '$60,000 - $80,000', experience: '0-2 years' },
          { level: 'Mid-Level Developer', salary: '$80,000 - $120,000', experience: '2-5 years' },
          { level: 'Senior Developer', salary: '$120,000 - $180,000', experience: '5+ years' },
          { level: 'Tech Lead', salary: '$150,000 - $200,000', experience: '7+ years' }
        ],
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
        education: 'Bachelor\'s in Computer Science or related field',
        image: 'https://readdy.ai/api/search-image?query=Professional%20software%20engineer%20working%20on%20computer%20coding%20programming%20modern%20office%20environment%20with%20multiple%20monitors%20clean%20workspace%20technology%20atmosphere&width=400&height=300&seq=sw-eng-1&orientation=landscape'
      },
      {
        id: 2,
        title: 'Data Scientist',
        category: 'Analytics',
        level: 'Mid to Senior',
        description: 'Analyze complex data sets to extract insights and drive business decisions using statistical methods and machine learning.',
        averageSalary: '$90,000 - $160,000',
        growth: '+35%',
        popularity: 88,
        requiredSkills: ['Python/R', 'Statistics', 'Machine Learning', 'Data Visualization'],
        keyResponsibilities: [
          'Analyze large datasets for trends',
          'Build predictive models',
          'Create data visualizations',
          'Present findings to stakeholders'
        ],
        careerProgression: [
          { level: 'Data Analyst', salary: '$70,000 - $90,000', experience: '0-2 years' },
          { level: 'Data Scientist', salary: '$90,000 - $130,000', experience: '2-5 years' },
          { level: 'Senior Data Scientist', salary: '$130,000 - $180,000', experience: '5+ years' },
          { level: 'Principal Data Scientist', salary: '$180,000 - $250,000', experience: '8+ years' }
        ],
        topCompanies: ['Netflix', 'Spotify', 'Uber', 'Airbnb', 'Tesla'],
        education: 'Master\'s in Data Science, Statistics, or related field',
        image: 'https://readdy.ai/api/search-image?query=Data%20scientist%20analyzing%20charts%20graphs%20on%20computer%20screens%20with%20statistical%20models%20machine%20learning%20algorithms%20modern%20analytics%20office%20environment%20professional%20workspace&width=400&height=300&seq=data-sci-1&orientation=landscape'
      },
      {
        id: 3,
        title: 'Product Manager',
        category: 'Management',
        level: 'Mid to Senior',
        description: 'Drive product strategy and coordinate cross-functional teams to deliver successful products to market.',
        averageSalary: '$100,000 - $180,000',
        growth: '+28%',
        popularity: 82,
        requiredSkills: ['Product Strategy', 'User Research', 'Analytics', 'Communication'],
        keyResponsibilities: [
          'Define product roadmap',
          'Conduct market research',
          'Coordinate with engineering teams',
          'Analyze user feedback'
        ],
        careerProgression: [
          { level: 'Associate PM', salary: '$80,000 - $110,000', experience: '0-2 years' },
          { level: 'Product Manager', salary: '$110,000 - $150,000', experience: '2-5 years' },
          { level: 'Senior PM', salary: '$150,000 - $200,000', experience: '5+ years' },
          { level: 'Director of Product', salary: '$200,000 - $300,000', experience: '8+ years' }
        ],
        topCompanies: ['Apple', 'Google', 'Microsoft', 'Amazon', 'Salesforce'],
        education: 'Bachelor\'s in Business, Engineering, or related field',
        image: 'https://readdy.ai/api/search-image?query=Product%20manager%20leading%20team%20meeting%20with%20whiteboard%20strategy%20planning%20session%20modern%20office%20environment%20collaborative%20workspace%20professional%20atmosphere&width=400&height=300&seq=prod-mgr-1&orientation=landscape'
      },
      {
        id: 4,
        title: 'UX Designer',
        category: 'Design',
        level: 'Entry to Senior',
        description: 'Create intuitive user experiences through research, design, and testing of digital products.',
        averageSalary: '$70,000 - $130,000',
        growth: '+24%',
        popularity: 78,
        requiredSkills: ['Design Thinking', 'Prototyping', 'User Research', 'Figma/Sketch'],
        keyResponsibilities: [
          'Conduct user research',
          'Create wireframes and prototypes',
          'Design user interfaces',
          'Test and iterate designs'
        ],
        careerProgression: [
          { level: 'Junior UX Designer', salary: '$55,000 - $75,000', experience: '0-2 years' },
          { level: 'UX Designer', salary: '$75,000 - $110,000', experience: '2-5 years' },
          { level: 'Senior UX Designer', salary: '$110,000 - $150,000', experience: '5+ years' },
          { level: 'UX Design Lead', salary: '$150,000 - $200,000', experience: '7+ years' }
        ],
        topCompanies: ['Adobe', 'Figma', 'Airbnb', 'Spotify', 'Dropbox'],
        education: 'Bachelor\'s in Design, HCI, or related field',
        image: 'https://readdy.ai/api/search-image?query=UX%20designer%20creating%20user%20interface%20wireframes%20on%20computer%20with%20design%20tools%20modern%20creative%20workspace%20colorful%20sketches%20prototypes%20professional%20design%20environment&width=400&height=300&seq=ux-design-1&orientation=landscape'
      },
      {
        id: 5,
        title: 'DevOps Engineer',
        category: 'Technology',
        level: 'Mid to Senior',
        description: 'Streamline development and deployment processes through automation, monitoring, and infrastructure management.',
        averageSalary: '$85,000 - $150,000',
        growth: '+32%',
        popularity: 75,
        requiredSkills: ['Cloud Platforms', 'CI/CD', 'Docker', 'Kubernetes'],
        keyResponsibilities: [
          'Automate deployment processes',
          'Monitor system performance',
          'Manage cloud infrastructure',
          'Implement security measures'
        ],
        careerProgression: [
          { level: 'DevOps Engineer', salary: '$80,000 - $120,000', experience: '2-4 years' },
          { level: 'Senior DevOps Engineer', salary: '$120,000 - $160,000', experience: '4-7 years' },
          { level: 'DevOps Lead', salary: '$160,000 - $200,000', experience: '7+ years' },
          { level: 'Site Reliability Engineer', salary: '$180,000 - $250,000', experience: '8+ years' }
        ],
        topCompanies: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'HashiCorp'],
        education: 'Bachelor\'s in Computer Science or related field',
        image: 'https://readdy.ai/api/search-image?query=DevOps%20engineer%20monitoring%20server%20infrastructure%20cloud%20computing%20dashboard%20with%20multiple%20screens%20automation%20tools%20modern%20technical%20workspace%20professional%20environment&width=400&height=300&seq=devops-1&orientation=landscape'
      },
      {
        id: 6,
        title: 'Digital Marketing Manager',
        category: 'Marketing',
        level: 'Mid Level',
        description: 'Develop and execute digital marketing strategies to drive brand awareness and customer acquisition.',
        averageSalary: '$65,000 - $110,000',
        growth: '+18%',
        popularity: 70,
        requiredSkills: ['SEO/SEM', 'Social Media', 'Analytics', 'Content Strategy'],
        keyResponsibilities: [
          'Develop marketing campaigns',
          'Manage social media presence',
          'Analyze campaign performance',
          'Coordinate with creative teams'
        ],
        careerProgression: [
          { level: 'Marketing Specialist', salary: '$50,000 - $70,000', experience: '0-2 years' },
          { level: 'Digital Marketing Manager', salary: '$70,000 - $100,000', experience: '2-5 years' },
          { level: 'Senior Marketing Manager', salary: '$100,000 - $140,000', experience: '5+ years' },
          { level: 'Marketing Director', salary: '$140,000 - $200,000', experience: '7+ years' }
        ],
        topCompanies: ['HubSpot', 'Salesforce', 'Adobe', 'Google', 'Facebook'],
        education: 'Bachelor\'s in Marketing, Communications, or related field',
        image: 'https://readdy.ai/api/search-image?query=Digital%20marketing%20manager%20analyzing%20campaign%20performance%20on%20computer%20with%20social%20media%20metrics%20charts%20graphs%20modern%20office%20environment%20professional%20workspace&width=400&height=300&seq=digital-mkt-1&orientation=landscape'
      }
    ];
    setCareerPaths(mockCareerPaths);
    setFilteredPaths(mockCareerPaths);
  };

  const filterAndSortPaths = () => {
    let filtered = careerPaths;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(path => path.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(path => 
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'salary') return parseInt(b.averageSalary.split(' - ')[1].replace(/[$,]/g, '')) - parseInt(a.averageSalary.split(' - ')[1].replace(/[$,]/g, ''));
      if (sortBy === 'growth') return parseInt(b.growth.replace('%', '')) - parseInt(a.growth.replace('%', ''));
      return a.title.localeCompare(b.title);
    });

    setFilteredPaths(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const categories = ['all', 'Technology', 'Analytics', 'Management', 'Design', 'Marketing'];

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

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Career Paths</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover detailed information about various career paths, including salary ranges, growth prospects, and required skills to help you make informed decisions about your future.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search career paths..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <div className="flex space-x-1">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category === 'all' ? 'All' : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="popularity">Popularity</option>
                  <option value="salary">Salary</option>
                  <option value="growth">Growth Rate</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">{filteredPaths.length} career paths found</span>
              <div className="flex items-center space-x-2">
                <i className="ri-information-line text-blue-600"></i>
                <span className="text-sm text-gray-600">Click on any career path to explore details</span>
              </div>
            </div>
          </div>

          {/* Career Paths Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPaths.map(path => (
              <div key={path.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={path.image} 
                      alt={path.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {path.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{path.level}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{path.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{path.averageSalary}</div>
                      <div className="text-xs text-gray-500">Average Salary</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{path.growth}</div>
                      <div className="text-xs text-gray-500">Job Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{path.popularity}%</div>
                      <div className="text-xs text-gray-500">Popularity</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Career Progression</h4>
                    <div className="space-y-2">
                      {path.careerProgression.slice(0, 2).map((stage, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{stage.level}</span>
                          <span className="text-gray-600">{stage.salary}</span>
                        </div>
                      ))}
                      {path.careerProgression.length > 2 && (
                        <div className="text-xs text-gray-500">+{path.careerProgression.length - 2} more levels</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <i className="ri-building-line text-gray-600"></i>
                      <span className="text-sm text-gray-600">Top companies hiring</span>
                    </div>
                    <Link
                      href={`/career-paths/${path.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Explore Path
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPaths.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No career paths found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center mt-12">
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