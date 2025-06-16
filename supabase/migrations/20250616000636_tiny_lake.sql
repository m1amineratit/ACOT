/*
  # Email History Schema

  1. New Tables
    - `email_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `recipient_name` (text)
      - `recipient_company` (text, optional)
      - `purpose` (text)
      - `tone` (text)
      - `industry` (text, optional)
      - `urgency` (text)
      - `template_used` (text, optional)
      - `cold_email_content` (text)
      - `follow_up_content` (text)
      - `subject_lines` (jsonb, array of subject lines)
      - `tone_score` (integer, 0-100)
      - `readability_score` (integer, 0-100)
      - `is_favorite` (boolean, default false)
      - `response_received` (boolean, default false)
      - `response_rate` (integer, 0-100, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `email_history` table
    - Add policies for users to manage their own email history
*/

CREATE TABLE IF NOT EXISTS email_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name text NOT NULL,
  recipient_company text,
  purpose text NOT NULL,
  tone text NOT NULL,
  industry text,
  urgency text DEFAULT 'medium',
  template_used text,
  cold_email_content text NOT NULL,
  follow_up_content text NOT NULL,
  subject_lines jsonb DEFAULT '[]'::jsonb,
  tone_score integer CHECK (tone_score >= 0 AND tone_score <= 100),
  readability_score integer CHECK (readability_score >= 0 AND readability_score <= 100),
  is_favorite boolean DEFAULT false,
  response_received boolean DEFAULT false,
  response_rate integer CHECK (response_rate >= 0 AND response_rate <= 100),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS email_history_user_id_idx ON email_history(user_id);
CREATE INDEX IF NOT EXISTS email_history_created_at_idx ON email_history(created_at DESC);
CREATE INDEX IF NOT EXISTS email_history_tone_idx ON email_history(tone);
CREATE INDEX IF NOT EXISTS email_history_industry_idx ON email_history(industry);
CREATE INDEX IF NOT EXISTS email_history_is_favorite_idx ON email_history(is_favorite);

-- Enable RLS
ALTER TABLE email_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own email history"
  ON email_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own email history"
  ON email_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email history"
  ON email_history
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email history"
  ON email_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_email_history_updated_at
  BEFORE UPDATE ON email_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();