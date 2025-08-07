'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResumeLogsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const resumesPerPage = 10;

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsedAuth = JSON.parse(adminAuth);
      if (parsedAuth.user.role === 'admin') {
        setAdmin(parsedAuth.user);
        loadResumes();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadResumes = () => {
    // Mock resume data
    const mockResumes = [
      {
        id: 1,
        userName: 'John Doe',
        userEmail: 'john.doe@email.com',
        fileName: 'John_Doe_Resume.pdf',
        fileSize: '2.3 MB',
        uploadDate: '2024-01-20',
        status: 'processed',
        suggestionsCount: 5,
        matchedCareers: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer'],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        experience: '3 years',
        education: 'Bachelor\'s in Computer Science'
      },
      {
        id: 2,
        userName: 'Sarah Wilson',
        userEmail: 'sarah.wilson@email.com',
        fileName: 'Sarah_Wilson_CV.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2024-01-21',
        status: 'processing',
        suggestionsCount: 0,
        matchedCareers: [],
        skills: [],
        experience: '',
        education: ''
      },
      {
        id: 3,
        userName: 'Mike Johnson',
        userEmail: 'mike.johnson@email.com',
        fileName: 'Mike_Johnson_Resume.docx',
        fileSize: '1.5 MB',
        uploadDate: '2024-01-19',
        status: 'processed',
        suggestionsCount: 4,
        matchedCareers: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
        skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        experience: '5 years',
        education: 'Master\'s in Data Science'
      },
      {
        id: 4,
        userName: 'Lisa Brown',
        userEmail: 'lisa.brown@email.com',
        fileName: 'Lisa_Brown_Portfolio.pdf',
        fileSize: '3.1 MB',
        uploadDate: '2024-01-22',
        status: 'error',
        suggestionsCount: 0,
        matchedCareers: [],
        skills: [],
        experience: '',
        education: ''
      },
      {
        id: 5,
        userName: 'David Chen',
        userEmail: 'david.chen@email.com',
        fileName: 'David_Chen_Resume.pdf',
        fileSize: '2.7 MB',
        uploadDate: '2024-01-21',
        status: 'processed',
        suggestionsCount: 6,
        matchedCareers: ['Product Manager', 'Business Analyst', 'Project Manager'],
        skills: ['Project Management', 'Agile', 'Scrum', 'Analytics', 'Leadership'],
        experience: '7 years',
        education: 'MBA in Business Administration'
      },
      {
        id: 6,
        userName: 'Emma Davis',
        userEmail: 'emma.davis@email.com',
        fileName: 'Emma_Davis_CV.pdf',
        fileSize: '2.0 MB',
        uploadDate: '2024-01-20',
        status: 'processed',
        suggestionsCount: 3,
        matchedCareers: ['UX Designer', 'UI Designer', 'Product Designer'],
        skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
        experience: '4 years',
        education: 'Bachelor\'s in Design'
      }
    ];
    setResumes(mockResumes);
    setFilteredResumes(mockResumes);
    setIsLoading(false);
  };

  useEffect(() => {
    filterResumes();
  }, [searchTerm, filterStatus, resumes]);

  const filterResumes = () => {
    let filtered = resumes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resume => 
        resume.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(resume => resume.status === filterStatus);
    }

    setFilteredResumes(filtered);
    setCurrentPage(1);
  };

  const handleViewDetails = (resume) => {
    setSelectedResume(resume);
    setShowDetailsModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed': return 'ri-check-line';
      case 'processing': return 'ri-loader-4-line';
      case 'error': return 'ri-error-warning-line';
      default: return 'ri-file-line';
    }
  };

  // Pagination
  const indexOfLastResume = currentPage * resumesPerPage;
  const indexOfFirstResume = indexOfLastResume - resumesPerPage;
  const currentResumes = filteredResumes.slice(indexOfFirstResume, indexOfLastResume);
  const totalPages = Math.ceil(filteredResumes.length / resumesPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume logs...</p>
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
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Dashboard</Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Users</Link>
              <Link href="/admin/resumes" className="text-red-600 font-semibold cursor-pointer">Resumes</Link>
              <Link href="/admin/career-paths" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Career Paths</Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <i className="ri-admin-line text-red-600"></i>
                  </div>
                  <span className="text-gray-700">{admin?.name}</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Resume Logs</h1>
              <p className="text-gray-600 mt-1">View and manage all resume uploads and processing results</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-500">Total Resumes: </span>
                <span className="font-semibold text-gray-900">{filteredResumes.length}</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Resumes</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by user name, email, or filename..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="processed">Processed</option>
                  <option value="processing">Processing</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resume Logs Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestions</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentResumes.map((resume) => (
                    <tr key={resume.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {resume.userName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{resume.userName}</div>
                            <div className="text-sm text-gray-500">{resume.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{resume.fileName}</div>
                        <div className="text-sm text-gray-500">{resume.fileSize}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                          <i className={`${getStatusIcon(resume.status)} mr-1`}></i>
                          {resume.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {resume.suggestionsCount > 0 ? (
                          <span className="text-green-600 font-semibold">{resume.suggestionsCount} suggestions</span>
                        ) : (
                          <span className="text-gray-500">No suggestions</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resume.uploadDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleViewDetails(resume)}
                          className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          <i className="ri-eye-line mr-1"></i>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstResume + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastResume, filteredResumes.length)}</span> of{' '}
                    <span className="font-medium">{filteredResumes.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === i + 1
                            ? 'z-10 bg-red-50 border-red-500 text-red-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Details Modal */}
      {showDetailsModal && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Resume Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">User Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-user-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.userName}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-mail-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.userEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-file-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.fileName}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-hard-drive-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.fileSize}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Processing Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedResume.status)}`}>
                        <i className={`${getStatusIcon(selectedResume.status)} mr-1`}></i>
                        {selectedResume.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-lightbulb-line text-gray-400 mr-3"></i>
                      <span className="text-gray-700">{selectedResume.suggestionsCount} career suggestions</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedResume.status === 'processed' && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Extracted Information</h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">Experience</h5>
                      <p className="text-gray-600">{selectedResume.experience}</p>
                      
                      <h5 className="font-medium text-gray-700 mb-3 mt-6">Education</h5>
                      <p className="text-gray-600">{selectedResume.education}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedResume.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium text-gray-700 mb-3">Matched Career Paths</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedResume.matchedCareers.map((career, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <i className="ri-briefcase-line text-red-600 mr-2"></i>
                            <span className="font-medium text-gray-900">{career}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}