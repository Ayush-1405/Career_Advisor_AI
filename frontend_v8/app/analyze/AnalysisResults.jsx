
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnalysisResults({ data }) {
  const [activeTab, setActiveTab] = useState('overview');

  const getSkillColor = (level) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{data.experience.totalYears}</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{data.skills.technical.length}</div>
          <div className="text-sm text-gray-600">Technical Skills</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{data.careerRecommendations[0].match}%</div>
          <div className="text-sm text-gray-600">Best Match</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{data.experience.industries.length}</div>
          <div className="text-sm text-gray-600">Industries</div>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-thumb-up-line text-green-600 mr-2"></i>
            Key Strengths
          </h3>
          <ul className="space-y-2">
            {data.strengths.map((strength, index) => (
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
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {data.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <i className="ri-arrow-right-line text-orange-600 mt-1 mr-2"></i>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Career Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Career Recommendations</h3>
        <div className="grid gap-4">
          {data.careerRecommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                  <p className="text-gray-600 text-sm">{rec.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{rec.match}%</div>
                  <div className="text-sm text-gray-500">Match</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>💰 {rec.salary}</span>
                <span>📈 {rec.growth} growth</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
          <div className="space-y-4">
            {data.skills.technical.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{skill.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
          <div className="space-y-4">
            {data.skills.soft.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-lightbulb-line text-red-600 mr-2"></i>
          Skill Gaps to Address
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data.skillGaps.map((gap, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  gap.importance === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {gap.importance}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">Recommended courses:</div>
              <ul className="text-sm space-y-1">
                {gap.courses.map((course, i) => (
                  <li key={i} className="text-blue-600">• {course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCareerPaths = () => (
    <div className="space-y-6">
      {data.careerRecommendations.map((rec, index) => (
        <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{rec.title}</h3>
              <p className="text-gray-600 mt-1">{rec.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{rec.match}%</div>
              <div className="text-sm text-gray-500">Match Score</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <i className="ri-money-dollar-circle-line text-green-600"></i>
              <span className="text-gray-700">Salary Range: {rec.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-trending-up-line text-blue-600"></i>
              <span className="text-gray-700">Growth Potential: {rec.growth}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2 min-w-32">
                <div 
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${rec.match}%` }}
                ></div>
              </div>
            </div>
            <Link 
              href={`/career-paths/${rec.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h2>
          <div className="flex items-center space-x-2">
            <i className="ri-check-line text-green-600"></i>
            <span className="text-green-600 font-semibold">Analysis Complete</span>
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
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'skills' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Skills Analysis
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'careers' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Career Paths
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'skills' && renderSkills()}
        {activeTab === 'careers' && renderCareerPaths()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/skills" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Take Skills Assessment
        </Link>
        <Link href="/career-paths" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Explore Career Paths
        </Link>
        <Link href="/dashboard" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer text-center whitespace-nowrap">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
