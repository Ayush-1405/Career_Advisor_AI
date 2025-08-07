
'use client';

import { useState } from 'react';

export default function SkillsTest({ onTestComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  const questions = [
    {
      id: 1,
      category: 'Technical',
      question: 'How would you rate your proficiency in JavaScript?',
      type: 'scale',
      scale: 'Beginner to Expert (1-5)'
    },
    {
      id: 2,
      category: 'Technical',
      question: 'Which programming languages are you most comfortable with?',
      type: 'multiple',
      options: ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue.js', 'Node.js']
    },
    {
      id: 3,
      category: 'Technical',
      question: 'How experienced are you with cloud platforms?',
      type: 'scale',
      scale: 'No experience to Expert (1-5)'
    },
    {
      id: 4,
      category: 'Technical',
      question: 'Which database technologies have you worked with?',
      type: 'multiple',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite', 'Cassandra', 'DynamoDB']
    },
    {
      id: 5,
      category: 'Technical',
      question: 'Rate your experience with version control systems (Git)',
      type: 'scale',
      scale: 'Beginner to Expert (1-5)'
    },
    {
      id: 6,
      category: 'Leadership',
      question: 'How comfortable are you leading a team?',
      type: 'scale',
      scale: 'Not comfortable to Very comfortable (1-5)'
    },
    {
      id: 7,
      category: 'Leadership',
      question: 'Have you mentored junior developers or colleagues?',
      type: 'choice',
      options: ['Never', 'Occasionally', 'Regularly', 'It\'s a major part of my role']
    },
    {
      id: 8,
      category: 'Communication',
      question: 'How would you rate your presentation skills?',
      type: 'scale',
      scale: 'Poor to Excellent (1-5)'
    },
    {
      id: 9,
      category: 'Communication',
      question: 'How comfortable are you with technical writing?',
      type: 'scale',
      scale: 'Not comfortable to Very comfortable (1-5)'
    },
    {
      id: 10,
      category: 'Problem Solving',
      question: 'When faced with a complex problem, what\'s your approach?',
      type: 'choice',
      options: [
        'Break it down into smaller parts',
        'Research similar solutions online',
        'Ask for help from colleagues',
        'Try different approaches until one works'
      ]
    },
    {
      id: 11,
      category: 'Problem Solving',
      question: 'How do you handle debugging complex issues?',
      type: 'choice',
      options: [
        'Systematic step-by-step approach',
        'Use debugging tools and logs',
        'Discuss with team members',
        'Take breaks and come back with fresh perspective'
      ]
    },
    {
      id: 12,
      category: 'Technical',
      question: 'Rate your knowledge of software architecture patterns',
      type: 'scale',
      scale: 'Beginner to Expert (1-5)'
    },
    {
      id: 13,
      category: 'Technical',
      question: 'Which development methodologies have you used?',
      type: 'multiple',
      options: ['Agile', 'Scrum', 'Waterfall', 'Kanban', 'DevOps', 'CI/CD', 'TDD', 'BDD']
    },
    {
      id: 14,
      category: 'Adaptability',
      question: 'How quickly do you adapt to new technologies?',
      type: 'scale',
      scale: 'Very slowly to Very quickly (1-5)'
    },
    {
      id: 15,
      category: 'Adaptability',
      question: 'How do you stay updated with industry trends?',
      type: 'choice',
      options: [
        'Regular reading of tech blogs and articles',
        'Attending conferences and meetups',
        'Online courses and certifications',
        'Networking with other professionals'
      ]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Generate mock results based on answers
      const mockResults = {
        overall: 82,
        categories: {
          technical: 85,
          leadership: 75,
          communication: 80,
          problemSolving: 90,
          adaptability: 88
        },
        strengths: [
          'Strong problem-solving abilities',
          'High adaptability to new technologies',
          'Solid technical foundation',
          'Good communication skills'
        ],
        improvements: [
          'Leadership and mentoring skills',
          'Advanced architecture knowledge',
          'Public speaking and presentation',
          'Team management experience'
        ],
        recommendations: [
          {
            title: 'Senior Software Engineer',
            match: 92,
            description: 'Your technical skills and problem-solving abilities make you an excellent candidate'
          },
          {
            title: 'Technical Lead',
            match: 78,
            description: 'With some leadership development, you could excel in this role'
          },
          {
            title: 'Solutions Architect',
            match: 75,
            description: 'Your adaptability and technical knowledge are strong foundations'
          }
        ],
        learningPath: [
          {
            skill: 'Leadership',
            courses: ['Leadership Fundamentals', 'Team Management', 'Mentoring Skills'],
            priority: 'High'
          },
          {
            skill: 'System Design',
            courses: ['Scalable Systems', 'Architecture Patterns', 'Microservices'],
            priority: 'Medium'
          },
          {
            skill: 'Public Speaking',
            courses: ['Presentation Skills', 'Technical Communication', 'Conference Speaking'],
            priority: 'Medium'
          }
        ]
      };
      
      onTestComplete(mockResults);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Time: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="text-sm text-blue-600 font-semibold mb-2">{currentQ.category}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQ.question}</h2>

        {currentQ.type === 'scale' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">{currentQ.scale}</div>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`w-12 h-12 rounded-full border-2 font-semibold transition-colors cursor-pointer ${
                    answers[currentQ.id] === value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQ.type === 'choice' && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors cursor-pointer ${
                  answers[currentQ.id] === option
                    ? 'bg-blue-50 border-blue-600 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'multiple' && (
          <div className="grid md:grid-cols-2 gap-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const currentAnswers = answers[currentQ.id] || [];
                  const newAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter(a => a !== option)
                    : [...currentAnswers, option];
                  handleAnswer(newAnswers);
                }}
                className={`p-3 text-left rounded-lg border-2 transition-colors cursor-pointer ${
                  (answers[currentQ.id] || []).includes(option)
                    ? 'bg-blue-50 border-blue-600 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            currentQuestion === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQ.id]}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            !answers[currentQ.id]
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
        </button>
      </div>
    </div>
  );
}
