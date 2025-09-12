'use client';

// Centralized API client for frontend -> Spring Boot backend
// Uses NEXT_PUBLIC_API_BASE_URL (e.g., http://localhost:8080)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

function buildUrl(path) {
	if (!path.startsWith('/')) {
		return `${API_BASE_URL}/${path}`;
	}
	return `${API_BASE_URL}${path}`;
}

export async function apiRequest(path, options = {}) {
	const url = buildUrl(path);
	const headers = new Headers(options.headers || {});
	if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
		headers.set('Content-Type', 'application/json');
	}

	// Attach auth token if present
	try {
		const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
		if (stored) {
			const { token } = JSON.parse(stored);
			if (token) headers.set('Authorization', `Bearer ${token}`);
		}
	} catch {}

	const response = await fetch(url, {
		...options,
		headers
	});

	if (!response.ok) {
		let message = `Request failed (${response.status})`;
		try {
			const data = await response.json();
			message = data.message || data.error || message;
		} catch {}
		throw new Error(message);
	}

	// Try JSON, fallback to text
	const contentType = response.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return response.json();
	}
	return response.text();
}

// Auth APIs
export async function loginUser(payload) {
	return apiRequest('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export async function registerUser(payload) {
	return apiRequest('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export async function requestPasswordReset(email, redirectBaseUrl) {
	const params = new URLSearchParams({ email, redirectBaseUrl });
	return apiRequest(`/api/auth/forgot-password?${params.toString()}`, {
		method: 'POST'
	});
}

export async function validateResetToken(token, email) {
	const params = new URLSearchParams({ token, email });
	return apiRequest(`/api/auth/reset-password/validate?${params.toString()}`, {
		method: 'GET'
	});
}

export async function resetPassword(token, email, newPassword) {
	const params = new URLSearchParams({ token, email, newPassword });
	return apiRequest(`/api/auth/reset-password?${params.toString()}`, {
		method: 'POST'
	});
}

// Career paths
export async function fetchCareerPaths() {
	return apiRequest('/api/career-paths', { method: 'GET' });
}

export async function fetchCareerPathById(id) {
	return apiRequest(`/api/career-paths/${id}`, { method: 'GET' });
}

// Resume: send JSON to backend /api/resumes
export async function submitResume(payload) {
	return apiRequest('/api/resumes', { method: 'POST', body: JSON.stringify(payload) });
}

// Dashboard stats
export async function fetchDashboardStats() {
	return apiRequest('/api/users/me/stats', { method: 'GET' });
}

// AI assistant
export async function chatWithAssistant(message) {
	return apiRequest('/api/assistant/chat', {
		method: 'POST',
		body: JSON.stringify({ message })
	});
}

// Admin endpoints (wired)
export async function fetchAdminUsers() {
	return apiRequest('/api/admin/users', { method: 'GET' });
}
export async function fetchAdminResumes() {
	return apiRequest('/api/admin/resumes', { method: 'GET' });
}
export async function fetchAdminAnalyses() {
	return apiRequest('/api/admin/analyses', { method: 'GET' });
}


