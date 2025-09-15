'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAdminUsers, fetchAdminResumes, fetchAdminAnalyses } from '../../lib/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [u, r, a] = await Promise.all([
          fetchAdminUsers(),
          fetchAdminResumes(),
          fetchAdminAnalyses()
        ]);
        setUsers(u);
        setResumes(r);
        setAnalyses(a);
      } catch (e) {
        setError(e.message || 'Failed to load admin data');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-brain-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerPath AI</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">{error}</div>}

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="p-2">{u.id}</td>
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Resumes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">ID</th>
                  <th className="p-2">User ID</th>
                  <th className="p-2">Education</th>
                  <th className="p-2">Skills</th>
                  <th className="p-2">Experience</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.id}</td>
                    <td className="p-2">{r.user?.id}</td>
                    <td className="p-2">{r.education}</td>
                    <td className="p-2">{r.skills}</td>
                    <td className="p-2">{r.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Analyses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">ID</th>
                  <th className="p-2">User ID</th>
                  <th className="p-2">Resume ID</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Strengths</th>
                  <th className="p-2">Improvements</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map(a => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.user?.id}</td>
                    <td className="p-2">{a.resume?.id}</td>
                    <td className="p-2">{a.overallScore}</td>
                    <td className="p-2">{a.strengths}</td>
                    <td className="p-2">{a.improvements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}










