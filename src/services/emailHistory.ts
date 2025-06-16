import { supabase } from '../lib/supabase';

export interface EmailHistoryRecord {
  id: string;
  user_id: string;
  recipient_name: string;
  recipient_company?: string;
  purpose: string;
  tone: string;
  industry?: string;
  urgency: string;
  template_used?: string;
  cold_email_content: string;
  follow_up_content: string;
  subject_lines: string[];
  tone_score?: number;
  readability_score?: number;
  is_favorite: boolean;
  response_received: boolean;
  response_rate?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateEmailHistoryData {
  recipient_name: string;
  recipient_company?: string;
  purpose: string;
  tone: string;
  industry?: string;
  urgency: string;
  template_used?: string;
  cold_email_content: string;
  follow_up_content: string;
  subject_lines?: string[];
  tone_score?: number;
  readability_score?: number;
}

export const createEmailHistory = async (data: CreateEmailHistoryData): Promise<EmailHistoryRecord | null> => {
  try {
    const { data: result, error } = await supabase
      .from('email_history')
      .insert({
        ...data,
        subject_lines: data.subject_lines || []
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating email history:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error creating email history:', error);
    return null;
  }
};

export const getEmailHistory = async (
  limit?: number,
  offset?: number,
  searchTerm?: string,
  toneFilter?: string,
  industryFilter?: string,
  favoritesOnly?: boolean
): Promise<{ data: EmailHistoryRecord[]; count: number } | null> => {
  try {
    let query = supabase
      .from('email_history')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (searchTerm) {
      query = query.or(`recipient_name.ilike.%${searchTerm}%,recipient_company.ilike.%${searchTerm}%,purpose.ilike.%${searchTerm}%`);
    }

    if (toneFilter && toneFilter !== 'all') {
      query = query.eq('tone', toneFilter);
    }

    if (industryFilter && industryFilter !== 'all') {
      query = query.eq('industry', industryFilter);
    }

    if (favoritesOnly) {
      query = query.eq('is_favorite', true);
    }

    // Apply pagination
    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching email history:', error);
      return null;
    }

    return { data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching email history:', error);
    return null;
  }
};

export const updateEmailHistory = async (
  id: string,
  updates: Partial<EmailHistoryRecord>
): Promise<EmailHistoryRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('email_history')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating email history:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating email history:', error);
    return null;
  }
};

export const deleteEmailHistory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('email_history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting email history:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting email history:', error);
    return false;
  }
};

export const toggleFavorite = async (id: string, isFavorite: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('email_history')
      .update({ is_favorite: isFavorite })
      .eq('id', id);

    if (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const getEmailStats = async (): Promise<{
  totalEmails: number;
  favoriteEmails: number;
  responseRate: number;
  topTone: string;
} | null> => {
  try {
    const { data, error } = await supabase
      .from('email_history')
      .select('tone, is_favorite, response_received, response_rate');

    if (error) {
      console.error('Error fetching email stats:', error);
      return null;
    }

    const totalEmails = data.length;
    const favoriteEmails = data.filter(email => email.is_favorite).length;
    const emailsWithResponses = data.filter(email => email.response_received);
    const avgResponseRate = emailsWithResponses.length > 0 
      ? emailsWithResponses.reduce((sum, email) => sum + (email.response_rate || 0), 0) / emailsWithResponses.length
      : 0;

    // Find most used tone
    const toneCount = data.reduce((acc, email) => {
      acc[email.tone] = (acc[email.tone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const toneEntries = Object.entries(toneCount);
    const topTone = toneEntries.length > 0 
      ? toneEntries.reduce((a, b) => toneCount[a[0]] > toneCount[b[0]] ? a : b)[0]
      : 'Professional';

    return {
      totalEmails,
      favoriteEmails,
      responseRate: Math.round(avgResponseRate),
      topTone
    };
  } catch (error) {
    console.error('Error fetching email stats:', error);
    return null;
  }
};