'use client';

// Centralized API client for frontend -> Spring Boot backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

function buildUrl(path) {
  return path.startsWith('/') ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
}

async function apiRequest(path, options = {}) {
  const url = buildUrl(path);
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
  } catch {}

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth');
      localStorage.removeItem('adminAuth');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized. Redirecting to login...');
    }

    let message = `Request failed (${response.status})`;
    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {}
    throw new Error(message);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return response.text();
}

// Auth
export async function loginUser(payload) {
  return apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export async function registerUser(payload) {
  return apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

// Career paths
export async function fetchCareerPaths() {
  return apiRequest('/api/career-paths', { method: 'GET' });
}

export async function fetchCareerPathById(id) {
  return apiRequest(`/api/career-paths/${id}`, { method: 'GET' });
}

// Resume
export async function submitResume(payload) {
  return apiRequest('/api/resumes', { method: 'POST', body: JSON.stringify(payload) });
}

// User dashboard
export async function fetchDashboardStats() {
  return apiRequest('/api/users/me/stats', { method: 'GET' });
}

export async function trackUserActivity(activityType, activityData = null) {
  return apiRequest('/api/users/me/activity', { method: 'POST', body: JSON.stringify({ activityType, activityData }) });
}

// Admin dashboard
export async function fetchAdminDashboardStats() {
  const stored = localStorage.getItem("adminAuth");
  if (!stored) throw new Error("Admin not logged in");

  const { token } = JSON.parse(stored);

  const res = await fetch("http://localhost:8080/api/admin/dashboard/stats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}


export async function fetchAdminUsers() {
  return apiRequest('/api/admin/users', { method: 'GET' });
}

export async function fetchAdminResumes() {
  return apiRequest('/api/admin/resumes', { method: 'GET' });
}

export async function fetchAdminAnalytics() {
  return apiRequest('/admin/analytics', { method: 'GET' });
}



 


export async function fetchAdminSettings() {
  return apiRequest('/api/admin/settings', { method: 'GET' });
}

export async function updateAdminSettings(payload) {
  return apiRequest('/api/admin/settings', { method: 'PUT', body: JSON.stringify(payload) });
}

// Reports
async function apiRequestBlob(path, options = {}) {
  const url = buildUrl(path);
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
  } catch {}
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.blob();
}

export async function generateReport(payload) {
  return apiRequest('/api/report/generate', { method: 'POST', body: JSON.stringify(payload) });
}

export async function downloadReportPdf(payload) {
  return apiRequestBlob('/api/report/pdf', { method: 'POST', body: JSON.stringify(payload) });
}

// AI assistant
export async function chatWithAssistant(message) {
  return apiRequest('/api/assistant/chat', { method: 'POST', body: JSON.stringify({ message }) });
}
