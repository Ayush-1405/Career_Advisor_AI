'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AIAssistantPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Career Assistant. I can help you with career advice, skill development, job search strategies, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('resume') || input.includes('cv')) {
      return "I can help you improve your resume! Here are some tips:\n\n• Use action verbs and quantify achievements\n• Tailor your resume to each job application\n• Keep it concise (1-2 pages)\n• Include relevant keywords from job descriptions\n• Highlight your most relevant experience first\n\nWould you like me to analyze your specific resume or help with a particular section?";
    }
    
    if (input.includes('interview') || input.includes('job interview')) {
      return "Great question about interviews! Here's how to prepare:\n\n• Research the company and role thoroughly\n• Practice common interview questions\n• Prepare specific examples using the STAR method\n• Dress appropriately for the company culture\n• Prepare thoughtful questions to ask the interviewer\n• Follow up with a thank-you email\n\nWould you like help preparing for a specific type of interview or role?";
    }
    
    if (input.includes('skills') || input.includes('learning')) {
      return "Skill development is crucial for career growth! Here's my advice:\n\n• Identify in-demand skills in your field\n• Set specific, measurable learning goals\n• Use online platforms like Coursera, Udemy, or LinkedIn Learning\n• Practice through real projects or freelance work\n• Get certified to validate your skills\n• Join communities and attend meetups\n\nWhat specific skills are you looking to develop?";
    }
    
    if (input.includes('career change') || input.includes('switch career')) {
      return "Career transitions can be exciting! Here's how to approach it:\n\n• Assess your transferable skills\n• Research your target industry thoroughly\n• Network with professionals in your desired field\n• Consider additional education or certifications\n• Start with informational interviews\n• Build a portfolio or gain relevant experience\n• Update your LinkedIn and resume for the new field\n\nWhat career field are you considering moving into?";
    }
    
    if (input.includes('salary') || input.includes('negotiate')) {
      return "Salary negotiation is an important skill! Here are key strategies:\n\n• Research market rates for your role and location\n• Document your achievements and value add\n• Consider the total compensation package\n• Practice your negotiation conversation\n• Be prepared to justify your request\n• Know when to walk away\n• Time your negotiation appropriately\n\nWould you like help preparing for a specific salary negotiation?";
    }
    
    if (input.includes('linkedin') || input.includes('networking')) {
      return "LinkedIn and networking are powerful career tools! Here's how to optimize:\n\n• Complete your LinkedIn profile with keywords\n• Share valuable content regularly\n• Engage with others' posts meaningfully\n• Connect with industry professionals\n• Join relevant LinkedIn groups\n• Attend virtual and in-person networking events\n• Follow up with new connections\n\nWould you like help with your LinkedIn profile or networking strategy?";
    }
    
    return "That's a great question! I'm here to help with all aspects of your career journey. I can assist with:\n\n• Resume and cover letter optimization\n• Interview preparation and practice\n• Skill development planning\n• Career transition strategies\n• Salary negotiation tips\n• LinkedIn profile enhancement\n• Job search strategies\n• Professional networking\n\nCould you provide more details about your specific situation so I can give you more targeted advice?";
  };

  const quickQuestions = [
    "How can I improve my resume?",
    "What should I ask in an interview?",
    "How do I negotiate salary?",
    "What skills should I learn?",
    "How do I change careers?",
    "Tips for networking?"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-lock-line text-red-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the AI Assistant</p>
          <Link href="/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/suggestions" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Career Suggestions</Link>
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
              <Link href="/ai-assistant" className="text-blue-600 font-semibold cursor-pointer">AI Assistant</Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-blue-600"></i>
                  </div>
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <i className="ri-logout-box-r-line"></i>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Career Assistant</h1>
            <p className="text-gray-600">
              Get instant career advice, tips, and guidance from our AI-powered assistant
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg h-96 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-2">
                          <i className="ri-robot-line text-white text-sm"></i>
                        </div>
                        <span className="text-sm font-semibold">AI Assistant</span>
                      </div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-2">
                        <i className="ri-robot-line text-white text-sm"></i>
                      </div>
                      <span className="text-sm font-semibold">AI Assistant</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Questions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300 cursor-pointer"
                >
                  <div className="flex items-center">
                    <i className="ri-question-line text-blue-600 mr-2"></i>
                    <span className="text-gray-700">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-24-hours-line text-blue-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Available</h4>
              <p className="text-sm text-gray-600">Get career advice anytime, anywhere</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-star-line text-green-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Advice</h4>
              <p className="text-sm text-gray-600">Tailored recommendations for your situation</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-brain-line text-purple-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-600">Advanced AI for intelligent responses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}