import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from './useSubscription';
import { UsageStats, USAGE_LIMITS } from '../types/usage';

export const useUsage = () => {
  const { user } = useAuth();
  const { isActive: isPremium } = useSubscription();
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setUsage(null);
      setLoading(false);
      return;
    }

    fetchUsage();
  }, [user]);

  const fetchUsage = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (!data) {
        // Create initial usage record using upsert to handle race conditions
        const newUsage = {
          user_id: user.id,
          emails_generated: 0,
          last_reset_date: new Date().toISOString(),
        };

        const { data: createdUsage, error: createError } = await supabase
          .from('user_usage')
          .upsert(newUsage, { onConflict: 'user_id' })
          .select()
          .single();

        if (createError) throw createError;
        setUsage(createdUsage);
      } else {
        // Check if we need to reset monthly usage
        const lastReset = new Date(data.last_reset_date);
        const now = new Date();
        const monthsSinceReset = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
                                (now.getMonth() - lastReset.getMonth());

        if (monthsSinceReset >= 1) {
          // Reset usage for new month
          const { data: resetUsage, error: resetError } = await supabase
            .from('user_usage')
            .update({
              emails_generated: 0,
              last_reset_date: now.toISOString(),
              updated_at: now.toISOString(),
            })
            .eq('user_id', user.id)
            .select()
            .single();

          if (resetError) throw resetError;
          setUsage(resetUsage);
        } else {
          setUsage(data);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch usage');
    } finally {
      setLoading(false);
    }
  };

  const incrementEmailUsage = async () => {
    if (!user || !usage) return false;

    try {
      const { data, error } = await supabase
        .from('user_usage')
        .update({
          emails_generated: usage.emails_generated + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUsage(data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update usage');
      return false;
    }
  };

  const canGenerateEmail = () => {
    if (!usage) return false;
    if (isPremium) return true; // Premium users have unlimited access
    
    const limit = USAGE_LIMITS.free.emailsPerMonth;
    return usage.emails_generated < limit;
  };

  const getRemainingEmails = () => {
    if (!usage) return 0;
    if (isPremium) return null; // null means unlimited
    
    const limit = USAGE_LIMITS.free.emailsPerMonth;
    return Math.max(0, limit - usage.emails_generated);
  };

  const getUsagePercentage = () => {
    if (!usage || isPremium) return 0;
    
    const limit = USAGE_LIMITS.free.emailsPerMonth;
    return Math.min(100, (usage.emails_generated / limit) * 100);
  };

  return {
    usage,
    loading,
    error,
    canGenerateEmail,
    getRemainingEmails,
    getUsagePercentage,
    incrementEmailUsage,
    isPremium,
    refetch: fetchUsage,
  };
};