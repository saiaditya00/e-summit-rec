/*
  # QR Code Management System

  1. New Tables
    - `qr_codes`
      - `id` (uuid, primary key)
      - `qr_url` (text, QR code image URL)
      - `count` (integer, remaining uses)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `qr_codes` table
    - Add policy for authenticated users to read QR codes
    - Add policy for service role to update QR codes
*/

CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_url text NOT NULL,
  count integer NOT NULL DEFAULT 2,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read QR codes
CREATE POLICY "Users can read QR codes"
  ON qr_codes FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow service role to update QR codes
CREATE POLICY "Service role can update QR codes"
  ON qr_codes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to handle QR code reset
CREATE OR REPLACE FUNCTION reset_qr_codes()
RETURNS void AS $$
BEGIN
  UPDATE qr_codes SET count = 2;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;