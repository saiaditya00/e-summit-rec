/*
  # Add payment QR codes

  1. New Data
    - Add payment QR codes to the qr_codes table
    - Update existing QR codes with payment-specific URLs
*/

UPDATE qr_codes 
SET qr_url = CASE id 
  WHEN (SELECT id FROM qr_codes ORDER BY created_at ASC LIMIT 1)
  THEN 'https://i.imgur.com/payment_qr1.jpg'
  ELSE 'https://i.imgur.com/payment_qr2.jpg'
END;

-- Insert additional payment QR codes if needed
INSERT INTO qr_codes (qr_url, count) VALUES 
('https://i.imgur.com/payment_qr3.jpg', 2),
('https://i.imgur.com/payment_qr4.jpg', 2);