/*
  # Add Icebreakers Column to Email History

  1. Schema Changes
    - Add `icebreakers` column to `email_history` table
    - Store as jsonb array for multiple icebreaker options
    - Add `recipient_context` column for storing personalization details

  2. Update existing records
    - Set default empty array for existing records
*/

-- Add icebreakers column to store AI-generated icebreaker options
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'email_history' AND column_name = 'icebreakers'
  ) THEN
    ALTER TABLE email_history ADD COLUMN icebreakers jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add recipient_context column to store personalization details
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'email_history' AND column_name = 'recipient_context'
  ) THEN
    ALTER TABLE email_history ADD COLUMN recipient_context text;
  END IF;
END $$;

-- Create index for better performance on icebreakers
CREATE INDEX IF NOT EXISTS email_history_icebreakers_idx ON email_history USING GIN (icebreakers);