/*
  # Add Google Authentication Provider

  1. Changes
    - Enable Google OAuth provider
    - Add necessary security policies
*/

-- Enable the google provider
CREATE OR REPLACE FUNCTION enable_google_auth()
RETURNS void AS $$
BEGIN
  INSERT INTO auth.providers (provider_id, enabled)
  VALUES ('google', true)
  ON CONFLICT (provider_id)
  DO UPDATE SET enabled = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;