import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

const SuccessPage: React.FC = () => {
  useEffect(() => {
    // Optional: Add analytics tracking here
    console.log('Payment successful');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
            <p className="text-gray-300 text-lg">
              Thank you for your purchase. Your subscription is now active and you can start using all premium features.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Link>

            <Link
              to="/pricing"
              className="w-full flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            >
              View All Plans
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@example.com" className="text-purple-400 hover:text-purple-300">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;