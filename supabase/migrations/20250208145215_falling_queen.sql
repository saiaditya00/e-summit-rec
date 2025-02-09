/*
  # Fix Database Structure and Constraints

  1. Changes
    - Drop and recreate profiles table with correct constraints
    - Add qr_code_id to registrations table
    - Update trigger for new user creation
    - Fix policies

  2. Security
    - Maintain RLS policies
    - Ensure proper foreign key constraints
*/

-- First drop dependent tables and triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS profiles;

-- Recreate profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY,
  full_name text DEFAULT '',
  avatar_url text DEFAULT '',
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Recreate registrations table with qr_code_id
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  qr_code_id uuid REFERENCES qr_codes(id) NOT NULL,
  phone text NOT NULL,
  institution text NOT NULL,
  profession text NOT NULL,
  tshirt_size text NOT NULL,
  location text NOT NULL,
  terms_accepted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for registrations
CREATE POLICY "Users can read own registration"
  ON registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registration"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create unique index on user_id for registrations
CREATE UNIQUE INDEX registrations_user_id_idx ON registrations(user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();