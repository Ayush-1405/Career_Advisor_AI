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
			// Auto logout on 401
			localStorage.removeItem('auth');
			localStorage.removeItem('adminAuth');
			localStorage.removeItem('admin');
			// sessionStorage.removeItem('adminAuth'); 	
			if (typeof window !== 'undefined') window.location.href = '/admin/login';
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
	if (contentType.includes('application/json')) {
		return response.json();
	}
	return response.text();
}

// // ✅ Fetch dashboard statistics
// export async function fetchDashboardStats() {
//   return apiRequest('/dashboard/stats', {
//     method: 'GET',
//   });
// }

// // ✅ Track user activity (like dashboard visit, resume upload, etc.)
// export async function trackUserActivity(activityType, details = '') {
//   return apiRequest('/user/activity', {
//     method: 'POST',
//     body: JSON.stringify({
//       type: activityType,
//       details,
//       timestamp: new Date().toISOString(),
//     }),
//   });
// }

// export async function apiRequest(path, options = {}) {
// 	const url = buildUrl(path);
// 	const headers = new Headers(options.headers || {});
// 	if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
// 		headers.set('Content-Type', 'application/json');
// 	}

// 	// Attach auth token if present
// 	try {
// 		const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
// 		if (stored) {
// 			const { token } = JSON.parse(stored);
// 			if (token) headers.set('Authorization', `Bearer ${token}`);
// 		}
// 	} catch {}

// 	const response = await fetch(url, {
// 		...options,
// 		headers
// 	});

// 	if (!response.ok) {
//   if (response.status === 401) {
//     localStorage.removeItem('auth'); // Clear invalid token
//     window.location.href = '/auth/login'; // Redirect to login
//   }
//   let message = `Request failed (${response.status})`;
//   try {
//     const data = await response.json();
//     message = data.message || data.error || message;
//   } catch {}
//   throw new Error(message);
// }


// 	// Try JSON, fallback to text
// 	const contentType = response.headers.get('content-type') || '';
// 	if (contentType.includes('application/json')) {
// 		return response.json();
// 	}
// 	return response.text();
// }

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

// Track user activity
export async function trackUserActivity(activityType, activityData = null) {
	return apiRequest('/api/users/me/activity', {
		method: 'POST',
		body: JSON.stringify({ activityType, activityData })
	});
}

// Admin dashboard stats
export async function fetchAdminDashboardStats() {
	return apiRequest('/api/admin/dashboard/stats', { method: 'GET' });
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

// Admin settings/analytics used by pages
export async function fetchAdminSettings() {
	return apiRequest('/api/admin/settings', { method: 'GET' });
}

export async function updateAdminSettings(payload) {
	return apiRequest('/api/admin/settings', { method: 'PUT', body: JSON.stringify(payload) });
}

export async function fetchAdminAnalytics() {
	return apiRequest('/api/admin/analytics', { method: 'GET' });
}

// Reports
export async function generateReport(payload) {
	return apiRequest('/api/report/generate', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

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
	if (!response.ok) {
		throw new Error(`Request failed (${response.status})`);
	}
	return response.blob();
}

export async function downloadReportPdf(payload) {
	return apiRequestBlob('/api/report/pdf', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}



