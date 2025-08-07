
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SkillsResults({ results }) {
  const [activeTab, setActiveTab] = useState('overview');

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
        <div className="text-5xl font-bold text-blue-600 mb-2">{results.overall}</div>
        <div className="text-gray-600 text-lg">Overall Skills Score</div>
        <div className="text-sm text-gray-500 mt-2">
          You scored higher than 78% of professionals in your field
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(results.categories).map(([category, score]) => (
          <div key={category} className="bg-white p-6 rounded-lg border text-center">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-gray-900 font-semibold mb-2 capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getScoreBackground(score)}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-star-line text-green-600 mr-2"></i>
            Your Strengths
          </h3>
          <ul className="space-y-2">
            {results.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <i className="ri-check-line text-green-600 mt-1 mr-2"></i>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-arrow-up-line text-orange-600 mr-2"></i>
            Areas for Growth
          </h3>
          <ul className="space-y-2">
            {results.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <i className="ri-arrow-right-line text-orange-600 mt-1 mr-2"></i>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Career Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Career Paths</h3>
        <div className="space-y-4">
          {results.recommendations.map((rec, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                <span className="text-green-600 font-bold">{rec.match}% Match</span>
              </div>
              <p className="text-gray-600 text-sm">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearningPath = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Personalized Learning Path</h3>
        <p className="text-gray-600">
          Based on your assessment, here are the skills you should focus on developing
        </p>
      </div>

      {results.learningPath.map((item, index) => (
        <div key={index} className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i className="ri-book-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.skill}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.priority} Priority
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold text-gray-900 mb-2">Recommended Courses:</h5>
            <div className="grid md:grid-cols-3 gap-2">
              {item.courses.map((course, i) => (
                <div key={i} className="bg-blue-50 px-3 py-2 rounded-lg text-sm text-blue-800">
                  {course}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Estimated time: 2-3 months
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              Start Learning
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDetailedAnalysis = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Score Breakdown</h3>
        <div className="space-y-6">
          {Object.entries(results.categories).map(([category, score]) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`font-bold ${getScoreColor(score)}`}>{score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getScoreBackground(score)}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {score >= 80 && 'Excellent - You excel in this area'}
                {score >= 60 && score < 80 && 'Good - Some room for improvement'}
                {score < 60 && 'Needs Development - Focus area for growth'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Comparison</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <div className="font-semibold text-gray-900">Software Engineering</div>
              <div className="text-sm text-gray-600">Your score vs industry average</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{results.overall}</div>
              <div className="text-sm text-gray-500">vs 72 avg</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-gray-900">Top 25%</div>
              <div className="text-sm text-gray-600">Your ranking in the field</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-semibold text-gray-900">Senior Level</div>
              <div className="text-sm text-gray-600">Experience category</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Skills Assessment Results</h2>
          <div className="flex items-center space-x-2">
            <i className="ri-trophy-line text-yellow-500"></i>
            <span className="text-gray-600">Assessment Complete</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'learning' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Learning Path
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'detailed' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Detailed Analysis
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'learning' && renderLearningPath()}
        {activeTab === 'detailed' && renderDetailedAnalysis()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/analyze" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Analyze Resume
        </Link>
        <Link href="/career-paths" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Explore Career Paths
        </Link>
        <Link href="/dashboard" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
