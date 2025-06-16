import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  Play,
  MessageSquare,
  Volume2,
  Copy,
  Send,
  BarChart3,
  History,
  Crown,
  Sparkles,
  Eye,
  Filter,
  Download,
  Heart,
  Shield,
  Infinity
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Mail className="w-8 h-8 text-purple-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-xl font-bold text-white">ColdSpark</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Trusted by 10,000+ professionals</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-slide-up">
            Write cold emails that
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block animate-gradient">
              get replies
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200">
            ColdSpark helps you create personalized, professional outreach emails in seconds. 
            Powered by advanced AI to turn cold prospects into warm conversations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up delay-400">
            <Link
              to="/signup"
              className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Writing Better Emails
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up delay-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10k+</div>
              <div className="text-gray-400">Emails Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">30s</div>
              <div className="text-gray-400">Average Generation Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                close more deals
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform provides all the tools you need to create compelling outreach campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Personalized Tone</h3>
              <p className="text-gray-300 leading-relaxed">
                Choose from 7 advanced tones including persuasive, empathetic, and authoritative to match your brand voice perfectly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Follow-ups</h3>
              <p className="text-gray-300 leading-relaxed">
                Automatically generate perfectly timed follow-up emails that maintain engagement without being pushy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Email Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Track tone accuracy, readability scores, and response rates to optimize your outreach strategy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Voice Messages</h3>
              <p className="text-gray-300 leading-relaxed">
                Convert your emails to natural-sounding voice messages for a more personal touch.
              </p>
            </div>
          </div>

          {/* Premium Features Grid */}
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 mb-4">
                <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-medium">Premium Features</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Unlock Your Full Potential</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Take your outreach to the next level with advanced features designed for serious professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <History className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Complete Email History</h4>
                <p className="text-gray-300 text-sm">Access unlimited email history with advanced search, filtering, and export capabilities.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <Eye className="w-8 h-8 text-green-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Email Preview</h4>
                <p className="text-gray-300 text-sm">Preview your emails before generating to ensure perfect results every time.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <Filter className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Advanced Templates</h4>
                <p className="text-gray-300 text-sm">Access industry-specific templates for sales, partnerships, media outreach, and more.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <TrendingUp className="w-8 h-8 text-orange-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Response Tracking</h4>
                <p className="text-gray-300 text-sm">Monitor response rates and optimize your outreach strategy with detailed analytics.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <Download className="w-8 h-8 text-pink-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Export & Integration</h4>
                <p className="text-gray-300 text-sm">Export your email history and integrate with your favorite CRM or email client.</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <Shield className="w-8 h-8 text-cyan-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Priority Support</h4>
                <p className="text-gray-300 text-sm">Get faster response times and dedicated support to maximize your success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get from idea to inbox in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform -translate-y-1/2"></div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fill the Form</h3>
              <p className="text-gray-300 leading-relaxed">
                Enter your details, recipient information, and the purpose of your outreach. Choose your preferred tone and industry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full opacity-20 animate-ping delay-500"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Generation</h3>
              <p className="text-gray-300 leading-relaxed">
                Our advanced AI analyzes your input and generates personalized cold emails, follow-ups, and subject lines in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-green-500 rounded-full opacity-20 animate-ping delay-1000"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Track & Optimize</h3>
              <p className="text-gray-300 leading-relaxed">
                Copy, send, and track your emails. Use analytics to optimize your approach and watch your response rates soar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by professionals worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "ColdSpark increased my response rate by 300%. The AI-generated emails feel natural and personal. The email history feature helps me track what works best."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">JS</span>
                </div>
                <div>
                  <div className="text-white font-semibold">John Smith</div>
                  <div className="text-gray-400 text-sm">Sales Director</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The analytics dashboard is incredible. I can see exactly which tones work best for different industries. The lifetime plan was the best investment I made this year."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">MJ</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Maria Johnson</div>
                  <div className="text-gray-400 text-sm">Business Development</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "I save hours every week with ColdSpark. The premium templates and voice messages set me apart from the competition. My clients love the personal touch."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">DL</span>
                </div>
                <div>
                  <div className="text-white font-semibold">David Lee</div>
                  <div className="text-gray-400 text-sm">Startup Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Start free, upgrade when you're ready to scale your outreach
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-4">$0</div>
                <p className="text-gray-300">Perfect for getting started</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">3 emails per month</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">4 basic tones</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Basic templates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Email copy & export</span>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <div className="text-4xl font-bold text-white mb-4">$3.00<span className="text-lg">/month</span></div>
                <p className="text-gray-300">For serious professionals</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Unlimited emails</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">7 advanced tones</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Premium templates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Email analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Voice messages</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Email history</span>
                </div>
              </div>

              <Link
                to="/pricing"
                className="w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Upgrade to Premium
              </Link>
            </div>

            {/* Lifetime Plan */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Best Value
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Lifetime Access</h3>
                <div className="text-4xl font-bold text-white mb-2">$99.99</div>
                <div className="text-sm text-yellow-300 mb-4">One-time payment</div>
                <p className="text-gray-300">Pay once, use forever</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Infinity className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-gray-200">Everything in Premium</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Lifetime access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Future updates included</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">VIP support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-200">Early access to features</span>
                </div>
              </div>

              <Link
                to="/pricing"
                className="w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all transform hover:scale-105"
              >
                <Crown className="w-5 h-5 mr-2" />
                Get Lifetime Access
              </Link>

              <div className="mt-4 text-center">
                <p className="text-green-400 text-sm font-medium">
                  🎉 Save $36+ vs monthly plan annually
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your outreach?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of professionals who are already closing more deals with ColdSpark
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mail className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold text-white">ColdSpark</span>
            </div>
            
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link>
            </div>

            {/* Bolt Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Built with</span>
              <div className="flex items-center px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-300 text-sm font-medium">Bolt</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 ColdSpark. Empowering connections through AI. Built for the World's Largest Hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;