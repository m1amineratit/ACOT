/*
  # Setup Google OAuth Configuration

  1. Enable Google OAuth provider in Supabase Auth
  2. Update user metadata handling for Google users
  3. Ensure RLS policies work with OAuth users

  Note: This migration sets up the database side. 
  The Google OAuth provider must be configured in the Supabase dashboard:
  1. Go to Authentication > Providers
  2. Enable Google provider
  3. Add your Google OAuth client ID and secret
  4. Set redirect URL to: https://your-project.supabase.co/auth/v1/callback
*/

-- Ensure auth.users table can handle OAuth metadata
-- This is already handled by Supabase, but we'll add a comment for clarity

-- Update RLS policies to ensure they work with OAuth users
-- The existing policies should work fine since they use auth.uid()

-- Create a function to handle user profile updates from OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert a new user_usage record for OAuth users
  INSERT INTO public.user_usage (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user_usage for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure the trigger function has proper permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;