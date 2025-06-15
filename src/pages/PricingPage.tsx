import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Crown, Check, X, Star, Target, BarChart3, Clock, Users, Sparkles } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import PricingCard from '../components/subscription/PricingCard';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
  const freeFeatures = [
    '3 emails per month',
    'Basic AI generation',
    '4 tone options',
    'Basic templates',
    'Email copy & export'
  ];

  const premiumFeatures = [
    'Unlimited emails',
    'Advanced AI with industry insights',
    '7 tone options (including Persuasive, Empathetic)',
    'Premium templates library',
    'Email analytics & scoring',
    'Email history & export',
    'A/B testing for subject lines',
    'Response rate tracking',
    'Priority support',
    'Voice message generation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                Plan
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Unlock the full potential of AI-powered cold outreach with unlimited access and premium features
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg border border-white/20">
                <Target className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-white font-medium text-sm">Smart Templates</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg border border-white/20">
                <BarChart3 className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-white font-medium text-sm">Analytics</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg border border-white/20">
                <Clock className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-white font-medium text-sm">Email History</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg border border-white/20">
                <Users className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-white font-medium text-sm">Priority Support</span>
              </div>
            </div>
          </div>

          {/* Free vs Premium Comparison */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Free vs Premium</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Free Plan</h3>
                  <div className="space-y-4">
                    {freeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">Advanced analytics</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">Email history</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">Priority support</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">$0</div>
                    <div className="text-gray-300">Forever free</div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Recommended
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Premium Plan</h3>
                  <div className="space-y-4">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">$9.99</div>
                    <div className="text-purple-300">per month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {stripeProducts.map((product, index) => (
              <PricingCard
                key={product.id}
                product={product}
                isPopular={index === 0} // Make first product popular
              />
            ))}
          </div>

          {/* Feature Breakdown */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">What You Get with Premium</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">Advanced AI</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Industry-specific insights, advanced tone options, and smarter personalization for higher response rates.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">Email Analytics</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Track tone accuracy, readability scores, and response rates to optimize your outreach strategy.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-green-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">Premium Templates</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Access to high-converting templates for sales, partnerships, media outreach, and more.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-orange-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">Email History</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Keep track of all your generated emails with search, filtering, and export capabilities.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-yellow-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">A/B Testing</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Test multiple subject lines and email variations to find what works best for your audience.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-pink-400 mr-3" />
                  <h3 className="text-lg font-semibold text-white">Priority Support</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Get faster response times and dedicated support to help you maximize your outreach success.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
                <p className="text-gray-300">
                  Yes! You can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">What's the difference between monthly and lifetime?</h3>
                <p className="text-gray-300">
                  The lifetime plan gives you permanent access to all premium features with a one-time payment. It's perfect if you plan to use the tool long-term and want to save money.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Do you offer refunds?</h3>
                <p className="text-gray-300">
                  We offer a 30-day money-back guarantee. If you're not satisfied with the premium features, contact us for a full refund.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">How does the free plan work?</h3>
                <p className="text-gray-300">
                  The free plan gives you 3 email generations per month with basic features. It's perfect for trying out the tool and occasional use.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              All plans include a 30-day money-back guarantee
            </p>
            <p className="text-gray-500 text-xs">
              Questions? Contact us at support@coldspark.ai
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;