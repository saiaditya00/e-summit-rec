/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `phone` (text)
      - `institution` (text)
      - `profession` (text)
      - `tshirt_size` (text)
      - `location` (text)
      - `terms_accepted` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `registrations` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  phone text NOT NULL,
  institution text NOT NULL,
  profession text NOT NULL,
  tshirt_size text NOT NULL,
  location text NOT NULL,
  terms_accepted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own registration"
  ON registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registration"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE UNIQUE INDEX registrations_user_id_idx ON registrations(user_id);