
'use client';

import { useState } from 'react';

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

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    onAnalysisStart();
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysisData = {
        skills: {
          technical: [
            { name: 'JavaScript', level: 85, category: 'Programming' },
            { name: 'React', level: 78, category: 'Frontend' },
            { name: 'Node.js', level: 72, category: 'Backend' },
            { name: 'Python', level: 68, category: 'Programming' },
            { name: 'SQL', level: 75, category: 'Database' },
            { name: 'AWS', level: 65, category: 'Cloud' }
          ],
          soft: [
            { name: 'Leadership', level: 80 },
            { name: 'Communication', level: 85 },
            { name: 'Problem Solving', level: 90 },
            { name: 'Teamwork', level: 78 },
            { name: 'Project Management', level: 70 }
          ]
        },
        experience: {
          totalYears: 5,
          roles: [
            { title: 'Senior Software Engineer', company: 'TechCorp', duration: '2 years', current: true },
            { title: 'Full Stack Developer', company: 'StartupXYZ', duration: '2 years', current: false },
            { title: 'Junior Developer', company: 'WebSolutions', duration: '1 year', current: false }
          ],
          industries: ['Technology', 'E-commerce', 'Finance']
        },
        education: [
          { degree: 'Bachelor of Computer Science', institution: 'University of Technology', year: '2019' },
          { degree: 'AWS Certified Developer', institution: 'Amazon Web Services', year: '2023' }
        ],
        careerRecommendations: [
          {
            title: 'Senior Full Stack Engineer',
            match: 92,
            salary: '$95,000 - $125,000',
            growth: '+15%',
            description: 'Lead development of web applications using modern frameworks'
          },
          {
            title: 'Technical Lead',
            match: 85,
            salary: '$110,000 - $140,000',
            growth: '+20%',
            description: 'Guide technical decisions and mentor junior developers'
          },
          {
            title: 'Product Manager',
            match: 78,
            salary: '$100,000 - $130,000',
            growth: '+18%',
            description: 'Bridge technology and business requirements'
          }
        ],
        skillGaps: [
          { skill: 'Docker', importance: 'High', courses: ['Docker Fundamentals', 'Container Orchestration'] },
          { skill: 'Machine Learning', importance: 'Medium', courses: ['ML Basics', 'Python for AI'] },
          { skill: 'System Design', importance: 'High', courses: ['Scalable Systems', 'Architecture Patterns'] }
        ],
        strengths: [
          'Strong technical foundation in modern web technologies',
          'Excellent problem-solving abilities',
          'Good leadership and communication skills',
          'Diverse industry experience'
        ],
        improvements: [
          'Expand cloud computing knowledge',
          'Develop more advanced system design skills',
          'Gain experience with machine learning',
          'Strengthen project management capabilities'
        ]
      };
      
      onAnalysisComplete(mockAnalysisData);
    }, 3000);
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
