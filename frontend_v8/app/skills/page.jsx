
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SkillsTest from './SkillsTest';
import SkillsResults from './SkillsResults';

export default function SkillsPage() {
  const [testResults, setTestResults] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleTestStart = () => {
    setIsTestStarted(true);
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
  };

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
              <Link href="/career-paths" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Career Paths</Link>
              <Link href="/skills" className="text-blue-600 font-semibold cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {!isTestStarted && !testResults && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Skills Assessment</h1>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Take our comprehensive skills assessment to identify your strengths, discover areas for improvement, and get personalized career recommendations.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-time-line text-blue-600 text-2xl"></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">15-20 Minutes</h3>
                    <p className="text-sm text-gray-600">Complete assessment duration</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-question-line text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">50 Questions</h3>
                    <p className="text-sm text-gray-600">Comprehensive skill evaluation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-award-line text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Detailed Report</h3>
                    <p className="text-sm text-gray-600">Personalized insights and recommendations</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What You'll Get:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <i className="ri-check-line text-blue-600 mr-2"></i>
                      <span className="text-gray-700">Comprehensive skills profile across technical and soft skills</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-blue-600 mr-2"></i>
                      <span className="text-gray-700">Personalized career path recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-blue-600 mr-2"></i>
                      <span className="text-gray-700">Learning recommendations to fill skill gaps</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-blue-600 mr-2"></i>
                      <span className="text-gray-700">Salary insights and growth projections</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleTestStart}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          )}

          {isTestStarted && !testResults && (
            <SkillsTest onTestComplete={handleTestComplete} />
          )}

          {testResults && (
            <SkillsResults results={testResults} />
          )}
        </div>
      </div>
    </div>
  );
}
