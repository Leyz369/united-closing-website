/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person submitting
      - `email` (text) - Email address
      - `phone` (text, optional) - Phone number
      - `availability` (text) - Availability preference (Nebenberuflich, Vollzeit, etc.)
      - `goals` (text, optional) - User's goals and objectives
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of the submission (new, contacted, closed)
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for inserting contact submissions (public access for form submission)
    - Add policy for reading submissions (authenticated admin access only)

  3. Important Notes
    - Public insert access is granted to allow form submissions without authentication
    - Only authenticated users can read submissions (for admin access)
    - All submissions are timestamped automatically
*/

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  availability text NOT NULL DEFAULT 'Nebenberuflich',
  goals text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact submissions (for public form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update submissions
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx 
  ON contact_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx 
  ON contact_submissions(status);
