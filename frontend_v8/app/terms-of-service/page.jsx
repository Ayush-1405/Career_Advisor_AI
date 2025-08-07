'use client';

import Link from 'next/link';

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100 mb-4">
            Please read these terms carefully before using our services
          </p>
          <p className="text-blue-100">
            Last updated: January 1, 2024
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using CareerPath AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                CareerPath AI provides AI-powered career analysis and recommendations through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Resume analysis and skill extraction</li>
                <li>Career path recommendations</li>
                <li>Skills assessment tools</li>
                <li>Personalized career guidance</li>
                <li>AI-powered career assistant</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To use our services, you must create an account and provide accurate information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Providing accurate and up-to-date information</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Upload false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Upload malicious software or harmful content</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. AI and Recommendations</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-700 mb-4">
                Our AI provides career recommendations based on your resume and assessment data. Please note:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Recommendations are suggestions, not guarantees</li>
                <li>Results may vary based on individual circumstances</li>
                <li>We continuously improve our AI but cannot guarantee 100% accuracy</li>
                <li>Final career decisions remain your responsibility</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Data and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. By using our Service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Our collection and use of your data as described in our Privacy Policy</li>
                <li>Provide accurate information in your resume and assessments</li>
                <li>Our use of anonymized data to improve our AI services</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Content</h3>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of CareerPath AI and its licensors.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Content</h3>
              <p className="text-gray-700 mb-6">
                You retain ownership of your uploaded content (resumes, assessments) but grant us a license to use, process, and analyze this content to provide our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Subscription and Payments</h2>
              <p className="text-gray-700 mb-4">
                Our Service may offer both free and paid features:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Free tier includes basic resume analysis and career recommendations</li>
                <li>Premium features may require subscription</li>
                <li>Payments are processed securely through third-party providers</li>
                <li>Subscription terms and pricing are clearly displayed</li>
                <li>Cancellation policies apply as described in your subscription</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                In no event shall CareerPath AI be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Accuracy of AI recommendations</li>
                <li>Uninterrupted service availability</li>
                <li>Compatibility with all devices or software</li>
                <li>Achievement of specific career outcomes</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Termination</h2>
              <p className="text-gray-700 mb-6">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is incorporated, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> legal@careerpathai.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to get started?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Create Account
              </Link>
              <Link href="/privacy-policy" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/contact" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}