'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      question: 'How does the resume analysis work?',
      answer: 'Our AI analyzes your resume to extract key information including skills, experience level, education, and career progression. It then matches this data against our database of career paths and provides personalized recommendations.',
      category: 'resume'
    },
    {
      id: 2,
      question: 'What file formats are supported for resume upload?',
      answer: 'We support PDF, DOC, and DOCX file formats. Files should be under 10MB in size for optimal processing.',
      category: 'resume'
    },
    {
      id: 3,
      question: 'How accurate are the career path recommendations?',
      answer: 'Our AI has a 95% accuracy rate based on user feedback and successful career transitions. Recommendations are based on comprehensive analysis of your skills, experience, and market trends.',
      category: 'career'
    },
    {
      id: 4,
      question: 'Can I take the skills assessment multiple times?',
      answer: 'Yes, you can retake the skills assessment as many times as you want. We recommend taking it every 6 months to track your progress and get updated recommendations.',
      category: 'skills'
    },
    {
      id: 5,
      question: 'How do I access my dashboard?',
      answer: 'After creating an account and completing your first analysis, you can access your dashboard from the main navigation menu. Your dashboard contains all your results, recommendations, and progress tracking.',
      category: 'account'
    },
    {
      id: 6,
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data security very seriously. All uploaded documents are encrypted and stored securely. We never share your personal information with third parties without your explicit consent.',
      category: 'privacy'
    },
    {
      id: 7,
      question: 'What if I disagree with the AI recommendations?',
      answer: 'You can provide feedback on any recommendation through your dashboard. Our AI learns from user feedback to improve future recommendations. You can also speak with our AI assistant for personalized guidance.',
      category: 'career'
    },
    {
      id: 8,
      question: 'How do I delete my account?',
      answer: 'You can delete your account by going to Settings in your dashboard and selecting "Delete Account". Please note that this action is irreversible and will permanently remove all your data.',
      category: 'account'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'resume', name: 'Resume Analysis' },
    { id: 'career', name: 'Career Paths' },
    { id: 'skills', name: 'Skills Assessment' },
    { id: 'account', name: 'Account' },
    { id: 'privacy', name: 'Privacy & Security' }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">Sign In</Link>
                <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">Sign Up</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find answers to common questions and get the support you need
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <i className="ri-search-line absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link href="/contact" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-customer-service-2-line text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-600">Get in touch with our support team</p>
            </Link>

            <Link href="/ai-assistant" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-robot-line text-green-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
              <p className="text-gray-600">Chat with our AI for instant help</p>
            </Link>

            <Link href="/analyze" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-play-circle-line text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600">Begin your career analysis journey</p>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-search-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or category filter</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Still need help?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                <p className="text-gray-600 mb-2">Get detailed help via email</p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                  Send us a message →
                </Link>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-gray-600 mb-2">Chat with our AI assistant</p>
                <Link href="/ai-assistant" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                  Start chatting →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}