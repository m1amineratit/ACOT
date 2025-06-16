import React, { useState } from 'react';
import { Check, Loader, Crown, Zap, Star, Sparkles } from 'lucide-react';
import { StripeProduct } from '../../stripe-config';
import { createCheckoutSession } from '../../services/stripe';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ product, isPopular = false }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLifetime = product.mode === 'payment';

  return (
    <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border transition-all hover:scale-105 ${
      isPopular ? 'border-purple-400 shadow-2xl' : 'border-white/20 shadow-xl'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </span>
        </div>
      )}

      {isLifetime && (
        <div className="absolute -top-4 right-4">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Best Value
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          {isLifetime ? <Sparkles className="w-8 h-8 text-white" /> : <Crown className="w-8 h-8 text-white" />}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-white">${product.price}</span>
          <span className="text-gray-300 ml-2">
            {product.mode === 'subscription' ? '/month' : 'one-time'}
          </span>
        </div>
        {isLifetime && (
          <div className="mt-2">
            <span className="text-green-400 text-sm font-medium">
              Save $36+ vs monthly plan annually
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
            <span className="text-gray-200">{feature}</span>
          </div>
        ))}
      </div>

      {/* Free vs Premium comparison */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Free Plan</span>
          <span className="text-gray-400 text-sm">This Plan</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-300 text-sm">Emails/month</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">3</span>
              <div className="flex items-center">
                <Crown className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-300 text-sm font-medium">Unlimited</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Advanced features</span>
            <div className="flex items-center space-x-4">
              <span className="text-red-400 text-sm">✗</span>
              <span className="text-green-400 text-sm">✓</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Email analytics</span>
            <div className="flex items-center space-x-4">
              <span className="text-red-400 text-sm">✗</span>
              <span className="text-green-400 text-sm">✓</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full flex items-center justify-center px-8 py-4 font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
          isPopular
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500'
            : isLifetime
            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 focus:ring-yellow-500'
            : 'bg-white/20 text-white hover:bg-white/30 focus:ring-white/50'
        }`}
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Get ${product.name}`
        )}
      </button>

      {isLifetime && (
        <div className="mt-4 text-center">
          <p className="text-green-400 text-sm font-medium">
            🎉 Limited time offer - Save 90%
          </p>
        </div>
      )}
    </div>
  );
};

export default PricingCard;