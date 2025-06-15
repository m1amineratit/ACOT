import React from 'react';
import { X, Crown, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingEmails: number;
}

const UsageLimitModal: React.FC<UsageLimitModalProps> = ({ 
  isOpen, 
  onClose, 
  remainingEmails 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Usage Limit Reached</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-300 text-lg mb-2">
            You've used all {3 - remainingEmails} of your free email generations this month.
          </p>
          <p className="text-gray-400">
            Upgrade to Premium for unlimited access and more features!
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30 mb-6">
          <div className="flex items-center mb-4">
            <Crown className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Premium Benefits</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-gray-200">Unlimited email generation</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-gray-200">Unlimited voice messages</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-gray-200">Priority support</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-gray-200">Advanced AI features</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all"
          >
            Maybe Later
          </button>
          <Link
            to="/pricing"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitModal;