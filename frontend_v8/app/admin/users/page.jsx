'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ManageUsersPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterVerified, setFilterVerified] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const usersPerPage = 10;

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      const parsedAuth = JSON.parse(adminAuth);
      if (parsedAuth.user.role === 'admin') {
        setAdmin(parsedAuth.user);
        loadUsers();
      } else {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadUsers = () => {
    // Mock user data
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'user', verified: true, createdAt: '2024-01-15', lastLogin: '2024-01-20' },
      { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@email.com', role: 'user', verified: true, createdAt: '2024-01-16', lastLogin: '2024-01-21' },
      { id: 3, name: 'Mike Johnson', email: 'mike.johnson@email.com', role: 'user', verified: false, createdAt: '2024-01-17', lastLogin: '2024-01-19' },
      { id: 4, name: 'Lisa Brown', email: 'lisa.brown@email.com', role: 'premium', verified: true, createdAt: '2024-01-18', lastLogin: '2024-01-22' },
      { id: 5, name: 'David Chen', email: 'david.chen@email.com', role: 'user', verified: true, createdAt: '2024-01-19', lastLogin: '2024-01-21' },
      { id: 6, name: 'Emma Davis', email: 'emma.davis@email.com', role: 'user', verified: false, createdAt: '2024-01-20', lastLogin: '2024-01-20' },
      { id: 7, name: 'Alex Rodriguez', email: 'alex.rodriguez@email.com', role: 'premium', verified: true, createdAt: '2024-01-21', lastLogin: '2024-01-22' },
      { id: 8, name: 'Sophie Taylor', email: 'sophie.taylor@email.com', role: 'user', verified: true, createdAt: '2024-01-22', lastLogin: '2024-01-22' },
      { id: 9, name: 'Ryan Wilson', email: 'ryan.wilson@email.com', role: 'user', verified: false, createdAt: '2024-01-23', lastLogin: '2024-01-23' },
      { id: 10, name: 'Amanda Lee', email: 'amanda.lee@email.com', role: 'premium', verified: true, createdAt: '2024-01-24', lastLogin: '2024-01-24' },
      { id: 11, name: 'James Parker', email: 'james.parker@email.com', role: 'user', verified: true, createdAt: '2024-01-25', lastLogin: '2024-01-25' },
      { id: 12, name: 'Emily Clark', email: 'emily.clark@email.com', role: 'user', verified: false, createdAt: '2024-01-26', lastLogin: '2024-01-26' }
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setIsLoading(false);
  };

  useEffect(() => {
    filterUsers();
  }, [searchTerm, filterRole, filterVerified, users]);

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Verified filter
    if (filterVerified !== 'all') {
      filtered = filtered.filter(user => user.verified === (filterVerified === 'verified'));
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
    showToastNotification('User deleted successfully', 'success');
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

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              <Link href="/admin/users" className="text-red-600 font-semibold cursor-pointer">Users</Link>
              <Link href="/admin/resumes" className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer">Resumes</Link>
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
              <p className="text-gray-600 mt-1">View and manage all registered users</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-500">Total Users: </span>
                <span className="font-semibold text-gray-900">{filteredUsers.length}</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="premium">Premium</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastLogin}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
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
                    Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> results
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete User</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
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