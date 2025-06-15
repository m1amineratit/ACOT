import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Subscription } from '../types/subscription';
import { getProductByPriceId } from '../stripe-config';

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (error) {
          setError(error.message);
          return;
        }

        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const getActiveProductName = () => {
    if (!subscription || !subscription.price_id || subscription.subscription_status !== 'active') {
      return null;
    }

    const product = getProductByPriceId(subscription.price_id);
    return product?.name || null;
  };

  const isActive = subscription?.subscription_status === 'active';

  return {
    subscription,
    loading,
    error,
    isActive,
    activeProductName: getActiveProductName(),
  };
};