/*
  # Update QR Code URLs

  1. Changes
    - Update existing QR code URLs with the actual image URLs
*/

UPDATE qr_codes 
SET qr_url = CASE id 
  WHEN (SELECT id FROM qr_codes ORDER BY created_at ASC LIMIT 1)
  THEN 'https://i.imgur.com/qr1.jpg'
  ELSE 'https://i.imgur.com/qr2.jpg'
END;