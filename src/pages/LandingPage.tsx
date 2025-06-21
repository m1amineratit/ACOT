import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Award,
  Globe
} from 'lucide-react';

const EnhancedLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ColdSpark</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">How it Works</a>
              <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Reviews</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg font-medium">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"
            style={{ transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full border border-green-200 mb-8 animate-bounce">
                <Sparkles className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-700 font-medium">100% Free - All Premium Features</span>
              </div>

              {/* Main headline */}
              <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
                Write cold emails that
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent block mt-2">
                  actually get replies
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Transform your outreach with AI-powered personalization. Create professional, 
                engaging cold emails in seconds and watch your response rates soar.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl">
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Start Writing Better Emails
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all border-2 border-slate-200 hover:border-blue-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Setup in 30 seconds
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Forever free
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-4">
                  {/* Email preview mockup */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-slate-500 ml-4">New Email</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-blue-200 rounded-full w-1/2 animate-pulse delay-100"></div>
                    <div className="h-20 bg-slate-100 rounded-lg animate-pulse delay-200"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-blue-500 rounded-lg w-20 animate-pulse delay-300"></div>
                      <div className="h-8 bg-slate-200 rounded-lg w-16 animate-pulse delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-float delay-500">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
              <div className="text-4xl font-black text-blue-600 mb-2">95%</div>
              <div className="text-slate-600 font-medium">Higher Response Rate</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
              <div className="text-4xl font-black text-green-600 mb-2">Free</div>
              <div className="text-slate-600 font-medium">Forever & Always</div>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
              <div className="text-4xl font-black text-indigo-600 mb-2">30s</div>
              <div className="text-slate-600 font-medium">Email Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-6">
              <Award className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-700 font-medium">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                close more deals
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              All premium features included at no cost - unlimited emails, advanced AI, analytics, and more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">7 Advanced Tones</h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from professional, friendly, persuasive, empathetic, and more to match your brand voice perfectly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Smart Follow-ups</h3>
              <p className="text-slate-600 leading-relaxed">
                Automatically generate perfectly timed follow-up emails that maintain engagement without being pushy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Email Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Track tone accuracy, readability scores, and response rates to optimize your outreach strategy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Voice Messages</h3>
              <p className="text-slate-600 leading-relaxed">
                Convert your emails to natural-sounding voice messages for a more personal touch.
              </p>
            </div>
          </div>

          {/* All Features Grid */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 border border-slate-200">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full border border-yellow-200 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-yellow-700 font-semibold">All Features Free Forever</span>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">Everything Included</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                No hidden costs, no premium tiers - get access to all advanced features completely free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: History, title: "Complete Email History", desc: "Access unlimited email history with advanced search, filtering, and export capabilities.", color: "blue" },
                { icon: Eye, title: "Email Preview", desc: "Preview your emails before generating to ensure perfect results every time.", color: "green" },
                { icon: Filter, title: "Advanced Templates", desc: "Access industry-specific templates for sales, partnerships, media outreach, and more.", color: "purple" },
                { icon: TrendingUp, title: "Response Tracking", desc: "Monitor response rates and optimize your outreach strategy with detailed analytics.", color: "orange" },
                { icon: Download, title: "Export & Integration", desc: "Export your email history and integrate with your favorite CRM or email client.", color: "pink" },
                { icon: Infinity, title: "Unlimited Everything", desc: "No limits on emails, voice messages, or any features - use as much as you need.", color: "cyan" }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg">
                  <feature.icon className={`w-8 h-8 text-${feature.color}-500 mb-4`} />
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h4>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              How it works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get from idea to inbox in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-8 group-hover:scale-110 transition-transform shadow-xl">
                <span className="text-2xl font-black text-white">1</span>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Fill the Form</h3>
              <p className="text-slate-600 leading-relaxed">
                Enter your details, recipient information, and the purpose of your outreach. Choose your preferred tone and industry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8 group-hover:scale-110 transition-transform shadow-xl">
                <span className="text-2xl font-black text-white">2</span>
                <div className="absolute -inset-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-ping delay-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">AI Generation</h3>
              <p className="text-slate-600 leading-relaxed">
                Our advanced AI analyzes your input and generates personalized cold emails, follow-ups, and subject lines in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-8 group-hover:scale-110 transition-transform shadow-xl">
                <span className="text-2xl font-black text-white">3</span>
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full opacity-20 animate-ping delay-1000"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Track & Optimize</h3>
              <p className="text-slate-600 leading-relaxed">
                Copy, send, and track your emails. Use analytics to optimize your approach and watch your response rates soar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full border border-green-200 mb-6">
              <Users className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-green-700 font-medium">Loved by 10,000+ Users</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Trusted by professionals
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                worldwide
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed font-medium">
                "ColdSpark increased my response rate by 300%. The AI-generated emails feel natural and personal. And it's completely free!"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">JS</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">John Smith</div>
                  <div className="text-slate-600 text-sm">Sales Director at TechCorp</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed font-medium">
                "The analytics dashboard is incredible. I can see exactly which tones work best for different industries. Can't believe it's free!"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">MJ</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">Maria Johnson</div>
                  <div className="text-slate-600 text-sm">Business Development Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed font-medium">
                "I save hours every week with ColdSpark. The voice messages and analytics set me apart from the competition. Amazing value!"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">DL</span>
                </div>
                <div>
                  <div className="text-slate-800 font-bold">David Lee</div>
                  <div className="text-slate-600 text-sm">Startup Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to transform your outreach?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of professionals who are already closing more deals with ColdSpark - completely free
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Free Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
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