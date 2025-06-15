import React from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import LoadingSpinner from '../ui/LoadingSpinner';

const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, isActive, activeProductName } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <LoadingSpinner className="text-white" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center">
          <Crown className="w-6 h-6 text-gray-400 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-white">No Active Subscription</h3>
            <p className="text-gray-300">Upgrade to unlock premium features</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Crown className={`w-6 h-6 mr-3 ${isActive ? 'text-yellow-400' : 'text-gray-400'}`} />
          <div>
            <h3 className="text-lg font-semibold text-white">
              {activeProductName || 'Subscription'}
            </h3>
            <p className={`text-sm ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
              Status: {subscription.subscription_status}
            </p>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              Current period: {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
            </span>
          </div>
          
          {subscription.payment_method_brand && subscription.payment_method_last4 && (
            <div className="flex items-center text-sm text-gray-300">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>
                {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
              </span>
            </div>
          )}

          {subscription.cancel_at_period_end && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm">
                Your subscription will cancel at the end of the current period.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;