import React, { useState } from 'react';
import { Check, Loader } from 'lucide-react';
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

  return (
    <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border transition-all hover:scale-105 ${
      isPopular ? 'border-purple-400 shadow-2xl' : 'border-white/20 shadow-xl'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-white">${product.price}</span>
          <span className="text-gray-300 ml-2">
            {product.mode === 'subscription' ? '/month' : 'one-time'}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
          <span className="text-gray-200">Unlimited NFT wallet checks</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
          <span className="text-gray-200">Advanced analytics</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
          <span className="text-gray-200">Priority support</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
          <span className="text-gray-200">API access</span>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full flex items-center justify-center px-8 py-4 font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
          isPopular
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500'
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
    </div>
  );
};

export default PricingCard;