'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CareerPathsManagementPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [careerPaths, setCareerPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [careerPathToDelete, setCareerPathToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    salaryRange: '',
    growthRate: '',
    popularityScore: '',
    requiredSkills: '',
    responsibilities: '',
    workEnvironment: '',
    educationRequirements: '',
    topCompanies: ''
  });

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsedAuth = JSON.parse(adminAuth);
      if (parsedAuth.user.role === 'admin') {
        setAdmin(parsedAuth.user);
        loadCareerPaths();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadCareerPaths = () => {
    // Mock career paths data
    const mockCareerPaths = [
      {
        id: 1,
        title: 'Software Engineer',
        description: 'Design, develop, and maintain software applications and systems',
        category: 'Technology',
        salaryRange: '$80,000 - $150,000',
        growthRate: '22%',
        popularityScore: 95,
        requiredSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
        responsibilities: 'Write clean code, debug applications, collaborate with teams',
        workEnvironment: 'Office or remote, collaborative team environment',
        educationRequirements: 'Bachelor\'s degree in Computer Science or related field',
        topCompanies: ['Google', 'Microsoft', 'Apple', 'Facebook', 'Amazon'],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: 2,
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make informed decisions',
        category: 'Analytics',
        salaryRange: '$90,000 - $160,000',
        growthRate: '31%',
        popularityScore: 88,
        requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        responsibilities: 'Data analysis, model building, statistical analysis, reporting',
        workEnvironment: 'Office or remote, data-driven environment',
        educationRequirements: 'Master\'s degree in Data Science, Statistics, or related field',
        topCompanies: ['Netflix', 'Airbnb', 'Uber', 'LinkedIn', 'Spotify'],
        createdAt: '2024-01-16',
        updatedAt: '2024-01-21'
      },
      {
        id: 3,
        title: 'Product Manager',
        description: 'Lead product development from conception to launch',
        category: 'Management',
        salaryRange: '$100,000 - $180,000',
        growthRate: '19%',
        popularityScore: 82,
        requiredSkills: ['Product Strategy', 'Analytics', 'Leadership', 'Communication', 'Agile'],
        responsibilities: 'Product strategy, roadmap planning, stakeholder management',
        workEnvironment: 'Office-based, cross-functional collaboration',
        educationRequirements: 'Bachelor\'s degree in Business, Engineering, or related field',
        topCompanies: ['Google', 'Apple', 'Amazon', 'Microsoft', 'Tesla'],
        createdAt: '2024-01-17',
        updatedAt: '2024-01-22'
      },
      {
        id: 4,
        title: 'UX Designer',
        description: 'Create user-centered designs for digital products and services',
        category: 'Design',
        salaryRange: '$70,000 - $130,000',
        growthRate: '13%',
        popularityScore: 75,
        requiredSkills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Wireframing'],
        responsibilities: 'User research, design systems, prototyping, usability testing',
        workEnvironment: 'Creative studio or office, collaborative design teams',
        educationRequirements: 'Bachelor\'s degree in Design, HCI, or related field',
        topCompanies: ['Adobe', 'Spotify', 'Airbnb', 'Slack', 'Dropbox'],
        createdAt: '2024-01-18',
        updatedAt: '2024-01-23'
      }
    ];
    setCareerPaths(mockCareerPaths);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      salaryRange: '',
      growthRate: '',
      popularityScore: '',
      requiredSkills: '',
      responsibilities: '',
      workEnvironment: '',
      educationRequirements: '',
      topCompanies: ''
    });
  };

  const handleAddCareerPath = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEditCareerPath = (careerPath) => {
    setSelectedCareerPath(careerPath);
    setFormData({
      title: careerPath.title,
      description: careerPath.description,
      category: careerPath.category,
      salaryRange: careerPath.salaryRange,
      growthRate: careerPath.growthRate,
      popularityScore: careerPath.popularityScore.toString(),
      requiredSkills: careerPath.requiredSkills.join(', '),
      responsibilities: careerPath.responsibilities,
      workEnvironment: careerPath.workEnvironment,
      educationRequirements: careerPath.educationRequirements,
      topCompanies: careerPath.topCompanies.join(', ')
    });
    setShowEditModal(true);
  };

  const handleDeleteCareerPath = (careerPath) => {
    setCareerPathToDelete(careerPath);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCareerPaths(careerPaths.filter(cp => cp.id !== careerPathToDelete.id));
    setShowDeleteModal(false);
    setCareerPathToDelete(null);
    showToastNotification('Career path deleted successfully', 'success');
  };

  const handleSaveCareerPath = () => {
    if (showEditModal) {
      // Update existing career path
      const updatedCareerPaths = careerPaths.map(cp => 
        cp.id === selectedCareerPath.id 
          ? {
              ...cp,
              ...formData,
              requiredSkills: formData.requiredSkills.split(', ').map(skill => skill.trim()),
              topCompanies: formData.topCompanies.split(', ').map(company => company.trim()),
              popularityScore: parseInt(formData.popularityScore),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : cp
      );
      setCareerPaths(updatedCareerPaths);
      setShowEditModal(false);
      showToastNotification('Career path updated successfully', 'success');
    } else {
      // Add new career path
      const newCareerPath = {
        id: Date.now(),
        ...formData,
        requiredSkills: formData.requiredSkills.split(', ').map(skill => skill.trim()),
        topCompanies: formData.topCompanies.split(', ').map(company => company.trim()),
        popularityScore: parseInt(formData.popularityScore),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCareerPaths([...careerPaths, newCareerPath]);
      setShowAddModal(false);
      showToastNotification('Career path added successfully', 'success');
    }
    resetForm();
  };

  const showToastNotification = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
          <p className="text-gray-600">Loading career paths...</p>
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
              <Link href="/admin/resumes" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Resumes</Link>
              <Link href="/admin/career-paths" className="text-red-600 font-semibold cursor-pointer">Career Paths</Link>
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
              <h1 className="text-3xl font-bold text-gray-900">Career Paths Management</h1>
              <p className="text-gray-600 mt-1">Add, edit, and manage career path information</p>
            </div>
            <button
              onClick={handleAddCareerPath}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              <span>Add New Career Path</span>
            </button>
          </div>

          {/* Career Paths Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {careerPaths.map((careerPath) => (
              <div key={careerPath.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{careerPath.title}</h3>
                    <p className="text-gray-600 mb-3">{careerPath.description}</p>
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {careerPath.category}
                      </span>
                      <span className="text-sm text-gray-500">Growth: {careerPath.growthRate}</span>
                      <span className="text-sm text-gray-500">Score: {careerPath.popularityScore}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                      <strong>Salary:</strong> {careerPath.salaryRange}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {careerPath.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {careerPath.requiredSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{careerPath.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div>
                    <div>Created: {careerPath.createdAt}</div>
                    <div>Updated: {careerPath.updatedAt}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCareerPath(careerPath)}
                      className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteCareerPath(careerPath)}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showAddModal ? 'Add New Career Path' : 'Edit Career Path'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Technology">Technology</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Management">Management</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., $80,000 - $150,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate</label>
                  <input
                    type="text"
                    name="growthRate"
                    value={formData.growthRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 22%"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Popularity Score (1-100)</label>
                  <input
                    type="number"
                    name="popularityScore"
                    value={formData.popularityScore}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    min="1"
                    max="100"
                    placeholder="e.g., 85"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., JavaScript, React, Node.js"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of the career path..."
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Key responsibilities and duties..."
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Environment</label>
                <input
                  type="text"
                  name="workEnvironment"
                  value={formData.workEnvironment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Office or remote, collaborative team environment"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Requirements</label>
                <input
                  type="text"
                  name="educationRequirements"
                  value={formData.educationRequirements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Bachelor's degree in Computer Science"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Top Companies (comma-separated)</label>
                <input
                  type="text"
                  name="topCompanies"
                  value={formData.topCompanies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Google, Microsoft, Apple"
                  required
                />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCareerPath}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {showAddModal ? 'Add Career Path' : 'Update Career Path'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Career Path</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{careerPathToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center">
              <i className={`${toastType === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} mr-2`}></i>
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}