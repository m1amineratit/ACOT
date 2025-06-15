export interface UsageStats {
  user_id: string;
  emails_generated: number;
  last_reset_date: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLimits {
  free: {
    emailsPerMonth: number;
    voiceMessagesPerMonth: number;
  };
  premium: {
    emailsPerMonth: number | null; // null means unlimited
    voiceMessagesPerMonth: number | null;
  };
}

export const USAGE_LIMITS: UsageLimits = {
  free: {
    emailsPerMonth: 3,
    voiceMessagesPerMonth: 1,
  },
  premium: {
    emailsPerMonth: null, // unlimited
    voiceMessagesPerMonth: null, // unlimited
  },
};