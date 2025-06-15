import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Crown, Check, X } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import PricingCard from '../components/subscription/PricingCard';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the full potential of AI-powered cold outreach with unlimited access and premium features
            </p>
          </div>

          {/* Free vs Premium Comparison */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Free vs Premium</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Free Plan</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">3 emails per month</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Basic AI generation</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-gray-400">Limited voice messages</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-gray-400">No priority support</span>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Premium Plan</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Unlimited emails</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Advanced AI features</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Unlimited voice messages</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-gray-300">Priority support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stripeProducts.map((product, index) => (
              <PricingCard
                key={product.id}
                product={product}
                isPopular={index === 0} // Make first product popular
              />
            ))}
          </div>

          <div className="text-center mt-16">
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