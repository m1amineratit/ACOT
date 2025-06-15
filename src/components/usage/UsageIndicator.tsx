import React from 'react';
import { Crown, Zap, AlertTriangle } from 'lucide-react';
import { useUsage } from '../../hooks/useUsage';
import { Link } from 'react-router-dom';

const UsageIndicator: React.FC = () => {
  const { 
    usage, 
    loading, 
    canGenerateEmail, 
    getRemainingEmails, 
    getUsagePercentage, 
    isPremium 
  } = useUsage();

  if (loading || !usage) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 animate-pulse">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
      </div>
    );
  }

  const remaining = getRemainingEmails();
  const percentage = getUsagePercentage();

  if (isPremium) {
    return (
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="w-5 h-5 text-yellow-400 mr-2" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-300">Premium Active</h3>
              <p className="text-xs text-yellow-200">Unlimited email generation</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-yellow-300">∞</p>
            <p className="text-xs text-yellow-200">Emails left</p>
          </div>
        </div>
      </div>
    );
  }

  const isLowUsage = remaining <= 1;
  const isOutOfUsage = remaining === 0;

  return (
    <div className={`backdrop-blur-lg rounded-xl p-4 border transition-all ${
      isOutOfUsage 
        ? 'bg-red-500/20 border-red-500/30' 
        : isLowUsage 
        ? 'bg-yellow-500/20 border-yellow-500/30'
        : 'bg-white/10 border-white/20'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {isOutOfUsage ? (
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
          ) : (
            <Zap className="w-5 h-5 text-blue-400 mr-2" />
          )}
          <div>
            <h3 className={`text-sm font-semibold ${
              isOutOfUsage ? 'text-red-300' : isLowUsage ? 'text-yellow-300' : 'text-white'
            }`}>
              Free Plan
            </h3>
            <p className={`text-xs ${
              isOutOfUsage ? 'text-red-200' : isLowUsage ? 'text-yellow-200' : 'text-gray-300'
            }`}>
              {isOutOfUsage ? 'Usage limit reached' : `${remaining} emails remaining this month`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${
            isOutOfUsage ? 'text-red-300' : isLowUsage ? 'text-yellow-300' : 'text-white'
          }`}>
            {remaining}
          </p>
          <p className={`text-xs ${
            isOutOfUsage ? 'text-red-200' : isLowUsage ? 'text-yellow-200' : 'text-gray-300'
          }`}>
            left
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isOutOfUsage 
                ? 'bg-red-500' 
                : isLowUsage 
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {(isLowUsage || isOutOfUsage) && (
        <Link
          to="/pricing"
          className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to Premium
        </Link>
      )}
    </div>
  );
};

export default UsageIndicator;