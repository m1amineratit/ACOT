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
  Sparkles,
  Eye,
  Filter,
  Download,
  Heart,
  Shield,
  Infinity,
  Lightbulb,
  Globe,
  Award,
  Rocket
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/508396209_1062706966037301_4833881911616339195_n.webp"
                  alt="ColdSpark Logo"
                  className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                ColdSpark
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">How it Works</a>
              <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Reviews</a>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/app"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl hover:from-blue-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                Try ColdSpark Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-blue-100/20 to-violet-100/20 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 rounded-full mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-sm font-medium text-emerald-700">100% Free - No Login Required</span>
              </div>

              {/* Main headline */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-800 mb-6 leading-tight animate-slide-up">
                Write cold emails that
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent block animate-gradient bg-300% animate-gradient-x">
                  actually get replies
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed animate-slide-up delay-200 max-w-2xl">
                Transform your outreach with AI-powered personalization. Generate compelling cold emails, 
                smart follow-ups, and custom icebreakers that convert prospects into conversations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up delay-400">
                <Link
                  to="/app"
                  className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Try It Now - No Signup Required
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl hover:bg-white transition-all border border-slate-200 shadow-sm hover:shadow-md">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 animate-slide-up delay-600">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800 mb-1">95%</div>
                  <div className="text-slate-600 text-sm">Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-1">Free</div>
                  <div className="text-slate-600 text-sm">Forever</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800 mb-1">30s</div>
                  <div className="text-slate-600 text-sm">Generation Time</div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative animate-slide-up delay-300">
              <div className="relative">
                {/* Main illustration container */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-2xl border border-blue-100">
                  {/* Email mockup */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-4 text-sm text-slate-500">AI Email Generator</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Subject: Partnership Opportunity</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-full"></div>
                        <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                        <div className="h-2 bg-blue-200 rounded w-3/5"></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700">AI Icebreakers</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-emerald-200 rounded w-full"></div>
                        <div className="h-1.5 bg-emerald-200 rounded w-3/4"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-violet-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-slate-600">AI Generated</span>
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">95% Match Score</div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-violet-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Try It Now CTA */}
          <div className="text-center mt-16">
            <Link
              to="/app"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Try It Now - No Signup Required
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200/50 rounded-full mb-6">
              <Award className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700">Award-Winning Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent block">
                close more deals
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              All premium features included at no cost - unlimited emails, advanced AI, analytics, and more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">7 Advanced Tones</h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from professional, friendly, persuasive, empathetic, and more to match your brand voice perfectly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-violet-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">AI Icebreakers</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate personalized opening lines based on recipient context for maximum engagement and response rates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Smart Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Track tone accuracy, readability scores, and response rates to optimize your outreach strategy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Voice Messages</h3>
              <p className="text-slate-600 leading-relaxed">
                Convert your emails to natural-sounding voice messages for a more personal touch.
              </p>
            </div>
          </div>

          {/* All Features Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 border border-blue-200/50">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200/50 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-700 font-medium">All Features Free Forever</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Complete Toolkit Included</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                No hidden costs, no premium tiers - get access to all advanced features completely free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <History className="w-8 h-8 text-blue-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Complete Email History</h4>
                <p className="text-slate-600 text-sm">Access unlimited email history with advanced search, filtering, and export capabilities.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <Eye className="w-8 h-8 text-emerald-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Email Preview</h4>
                <p className="text-slate-600 text-sm">Preview your emails before generating to ensure perfect results every time.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <MessageSquare className="w-8 h-8 text-violet-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Smart Follow-ups</h4>
                <p className="text-slate-600 text-sm">Automatically generate perfectly timed follow-up emails that maintain engagement.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Response Tracking</h4>
                <p className="text-slate-600 text-sm">Monitor response rates and optimize your outreach strategy with detailed analytics.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <Download className="w-8 h-8 text-pink-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Export & Integration</h4>
                <p className="text-slate-600 text-sm">Export your email history and integrate with your favorite CRM or email client.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <Infinity className="w-8 h-8 text-cyan-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Unlimited Everything</h4>
                <p className="text-slate-600 text-sm">No limits on emails, voice messages, or any features - use as much as you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              How it works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get from idea to inbox in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-violet-300 transform -translate-y-1/2"></div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Fill the Form</h3>
              <p className="text-slate-600 leading-relaxed">
                Enter your details, recipient information, and the purpose of your outreach. Add personal context for AI icebreakers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 to-violet-500 rounded-full opacity-20 animate-ping delay-500"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">AI Generation</h3>
              <p className="text-slate-600 leading-relaxed">
                Our advanced AI analyzes your input and generates personalized emails, follow-ups, icebreakers, and subject lines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full opacity-20 animate-ping delay-1000"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Track & Optimize</h3>
              <p className="text-slate-600 leading-relaxed">
                Copy, send, and track your emails. Use analytics to optimize your approach and watch your response rates soar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Loved by professionals worldwide
            </h2>
            <p className="text-xl text-slate-600">Join thousands who are already closing more deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "ColdSpark increased my response rate by 300%. The AI icebreakers are game-changing - they feel so personal and natural!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">John Smith</div>
                  <div className="text-slate-500 text-sm">Sales Director at TechCorp</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "The analytics dashboard is incredible. I can see exactly which tones work best. Can't believe it's completely free!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">Maria Johnson</div>
                  <div className="text-slate-500 text-sm">Business Development Lead</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "I save hours every week with ColdSpark. The personalized icebreakers make my emails stand out from the crowd."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">DL</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">David Lee</div>
                  <div className="text-slate-500 text-sm">Startup Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-violet-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your outreach?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of professionals who are already closing more deals with ColdSpark
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/app"
              className="group flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Free Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-blue-200 text-sm mt-6">No credit card required • Free forever • Setup in 30 seconds</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/508396209_1062706966037301_4833881911616339195_n.webp"
                  alt="ColdSpark Logo"
                  className="w-10 h-10 rounded-xl"
                />
                <span className="text-xl font-bold text-white">ColdSpark</span>
              </div>
              <p className="text-slate-400 max-w-md">
                Transform your cold outreach with AI-powered personalization. Generate emails that actually get replies.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How it Works</a></li>
                <li><Link to="/app" className="text-slate-400 hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Reviews</a></li>
                <li><Link to="/app" className="text-slate-400 hover:text-white transition-colors">Try Free</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Built with Bolt Badge */}
          <div className="flex items-center justify-center mb-6">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30 text-yellow-300 hover:text-yellow-200 hover:bg-gradient-to-r hover:from-yellow-500/30 hover:to-orange-500/30 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2 text-yellow-400 group-hover:animate-pulse" />
              <span className="font-semibold">Built with Bolt</span>
              <div className="ml-2 px-2 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/40">
                <span className="text-yellow-300 text-xs font-bold">AI</span>
              </div>
            </a>
          </div>
          
          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 ColdSpark. Built with ❤️ for the World's Largest Hackathon.
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Powered by</span>
              <div className="flex items-center px-3 py-1 bg-slate-700 rounded-full border border-slate-600">
                <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-300 text-sm font-medium">Bolt</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;