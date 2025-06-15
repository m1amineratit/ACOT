import React from 'react';
import { stripeProducts } from '../stripe-config';
import PricingCard from '../components/subscription/PricingCard';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                Plan
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the full potential of AI-powered cold outreach with our premium features
            </p>
          </div>

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
            <p className="text-gray-400 text-sm">
              All plans include a 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;