'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 mb-4">
            Your privacy is important to us
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                When you create an account or use our services, we may collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Name and email address</li>
                <li>Professional information from your resume</li>
                <li>Skills assessment results</li>
                <li>Career preferences and goals</li>
                <li>Usage data and analytics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Data</h3>
              <p className="text-gray-700 mb-6">
                When you upload your resume, we extract and analyze information including work experience, education, skills, and achievements. This data is used solely to provide you with personalized career recommendations.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Provide AI-powered career analysis and recommendations</li>
                <li>Personalize your experience on our platform</li>
                <li>Improve our AI algorithms and services</li>
                <li>Send you relevant updates and career insights</li>
                <li>Provide customer support</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>All data is encrypted in transit and at rest</li>
                <li>Secure servers with regular security updates</li>
                <li>Access controls and authentication protocols</li>
                <li>Regular security audits and monitoring</li>
                <li>Compliance with data protection regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Data Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers who help us operate our platform</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Remember your preferences</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized content</li>
                <li>Improve user experience</li>
              </ul>
              <p className="text-gray-700 mb-6">
                You can control cookie settings through your browser preferences.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your data only as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time through your account settings.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our services are not intended for users under 16 years of age. We do not knowingly collect personal information from children under 16.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-6">
                Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@careerpathai.com
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need to manage your data?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Access Your Data
              </Link>
              <Link href="/contact" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}