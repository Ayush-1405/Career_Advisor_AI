
'use client';

import { useState } from 'react';
import { submitResume } from '../../lib/api';

export default function ResumeUpload({ onAnalysisStart, onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    onAnalysisStart();
    try {
      const payload = { education: '', skills: selectedFile.name, experience: '' };
      const analysis = await submitResume(payload);
      onAnalysisComplete({
        strengths: (analysis?.strengths || '').split(',').filter(Boolean),
        improvements: (analysis?.improvements || '').split(',').filter(Boolean),
        skills: { technical: [], soft: [] },
        experience: { totalYears: 0, roles: [], industries: [] },
        education: [],
        careerRecommendations: []
      });
    } catch (e) {
      // On error, provide graceful fallback structure for UI
      onAnalysisComplete({
        skills: { technical: [], soft: [] },
        experience: { totalYears: 0, roles: [], industries: [] },
        education: [],
        careerRecommendations: [],
        skillGaps: [],
        strengths: [],
        improvements: [],
        error: e.message || 'Failed to analyze resume'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Support PDF, DOC, and DOCX formats. Maximum file size: 10MB
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-upload-cloud-2-line text-gray-500 text-2xl"></i>
        </div>
        
        {!selectedFile ? (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Drag and drop your resume here
            </h3>
            <p className="text-gray-600 mb-4">or</p>
            <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
              />
            </label>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <i className="ri-file-text-line text-green-600 text-xl"></i>
              <span className="text-gray-900 font-medium">{selectedFile.name}</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                Remove
              </button>
              <button
                onClick={handleAnalyze}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Analyze Resume
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-search-line text-blue-600 text-xl"></i>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Skills Analysis</h4>
          <p className="text-sm text-gray-600">Extract and categorize your technical and soft skills</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-compass-3-line text-purple-600 text-xl"></i>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Career Matching</h4>
          <p className="text-sm text-gray-600">Find roles that match your experience and skills</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-lightbulb-line text-green-600 text-xl"></i>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Recommendations</h4>
          <p className="text-sm text-gray-600">Get personalized suggestions for career growth</p>
        </div>
      </div>
    </div>
  );
}
