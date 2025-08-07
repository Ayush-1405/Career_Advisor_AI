<<<<<<< HEAD
=======

>>>>>>> 9c3495dfddaf30f5f49bcae2a62b9d6f7d0a15ca
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b font-semibold">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-brain-line text-white text-lg"></i>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerPath AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/analyze" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Resume Analyzer</Link>
              <Link href="/career-paths" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Career Paths</Link>
              <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Sign In</Link>
              <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl text-gray-700`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
                <Link href="/analyze" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Resume Analyzer</Link>
                <Link href="/career-paths" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Career Paths</Link>
                <Link href="/skills" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Skills Assessment</Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Dashboard</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">Sign In</Link>
                  <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-center whitespace-nowrap">
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div 
          className="absolute inset-0 bg-cover bg-center"
          id='bg_img'
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20business%20people%20working%20with%20AI%20technology%2C%20modern%20office%20environment%20with%20digital%20interfaces%2C%20career%20development%20and%20growth%2C%20bright%20and%20clean%20background%20with%20soft%20lighting%2C%20professional%20atmosphere%20with%20technology%20elements%2C%20minimalist%20design&width=1920&height=800&seq=hero-career-ai&orientation=landscape')`
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 mb-4 sm:mb-6">
              Discover Your Perfect <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career Path</span>
            </h1>
            <p className="text-lg font-bold sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Leverage AI-powered resume analysis and skill assessment to find your ideal career trajectory. Get personalized recommendations based on your unique profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/analyze" className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Analyze My Resume
              </Link>
              <Link href="/skills" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg font-bold border-2 border-blue-600 hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap">
                Take Skills Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Powerful AI-Driven Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced AI analyzes your skills, experience, and career goals to provide personalized guidance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-text-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Analysis</h3>
              <p className="text-gray-600">
                Upload your resume and get detailed insights about your skills, experience level, and career positioning
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-compass-3-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Pathways</h3>
              <p className="text-gray-600">
                Discover multiple career paths based on your skills and interests with detailed roadmaps and requirements
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-bar-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills Assessment</h3>
              <p className="text-gray-600">
                Take comprehensive skills tests to identify your strengths and areas for improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to discover your ideal career path
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600 text-sm">Upload your resume for AI analysis</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Skills Assessment</h3>
              <p className="text-gray-600 text-sm">Take our comprehensive skills test</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Get personalized career recommendations</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Roadmap</h3>
              <p className="text-gray-600 text-sm">Follow your personalized career path</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm sm:text-base">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600 text-sm sm:text-base">Career Paths</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm sm:text-base">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Career?</h2>
          <p className="text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal career path with our AI-powered platform
          </p>
          <Link href="/analyze" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-brain-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold">CareerPath AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering careers through AI-driven insights and personalized guidance
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/analyze" className="hover:text-white transition-colors cursor-pointer">Resume Analysis</Link></li>
                <li><Link href="/skills" className="hover:text-white transition-colors cursor-pointer">Skills Assessment</Link></li>
                <li><Link href="/career-paths" className="hover:text-white transition-colors cursor-pointer">Career Paths</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors cursor-pointer">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help-center" className="hover:text-white transition-colors cursor-pointer">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <i className="ri-twitter-line text-gray-400"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <i className="ri-linkedin-line text-gray-400"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <i className="ri-facebook-line text-gray-400"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 CareerPath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
