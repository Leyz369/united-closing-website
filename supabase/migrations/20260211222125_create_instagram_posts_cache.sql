/*
  # Create Instagram Posts Cache Table

  1. New Tables
    - `instagram_posts`
      - `id` (uuid, primary key) - Unique identifier
      - `instagram_id` (text, unique) - Instagram post ID
      - `media_type` (text) - Type of media (IMAGE, VIDEO, CAROUSEL_ALBUM)
      - `media_url` (text) - URL to the media
      - `thumbnail_url` (text, nullable) - Thumbnail for videos
      - `permalink` (text) - Link to the Instagram post
      - `caption` (text, nullable) - Post caption
      - `timestamp` (timestamptz) - When the post was created on Instagram
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated
    
    - `instagram_cache_metadata`
      - `id` (uuid, primary key) - Unique identifier
      - `last_fetched_at` (timestamptz) - Last time posts were fetched from Instagram
      - `access_token` (text, nullable) - Instagram access token (encrypted)
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on both tables
    - Allow public read access to instagram_posts (for displaying on website)
    - Restrict write access to service role only
    - Restrict all access to instagram_cache_metadata to service role only

  3. Indexes
    - Index on instagram_id for fast lookups
    - Index on timestamp for sorting by date
*/

-- Create instagram_posts table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_id text UNIQUE NOT NULL,
  media_type text NOT NULL,
  media_url text NOT NULL,
  thumbnail_url text,
  permalink text NOT NULL,
  caption text,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create instagram_cache_metadata table
CREATE TABLE IF NOT EXISTS instagram_cache_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  last_fetched_at timestamptz,
  access_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_instagram_posts_instagram_id ON instagram_posts(instagram_id);
CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp ON instagram_posts(timestamp DESC);

-- Enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_cache_metadata ENABLE ROW LEVEL SECURITY;

-- RLS Policies for instagram_posts
CREATE POLICY "Allow public read access to instagram posts"
  ON instagram_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only service role can insert instagram posts"
  ON instagram_posts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Only service role can update instagram posts"
  ON instagram_posts
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only service role can delete instagram posts"
  ON instagram_posts
  FOR DELETE
  TO service_role
  USING (true);

-- RLS Policies for instagram_cache_metadata (service role only)
CREATE POLICY "Only service role can read cache metadata"
  ON instagram_cache_metadata
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Only service role can insert cache metadata"
  ON instagram_cache_metadata
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Only service role can update cache metadata"
  ON instagram_cache_metadata
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_instagram_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for instagram_posts
DROP TRIGGER IF EXISTS trigger_update_instagram_posts_updated_at ON instagram_posts;
CREATE TRIGGER trigger_update_instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_instagram_posts_updated_at();

-- Create trigger for instagram_cache_metadata
DROP TRIGGER IF EXISTS trigger_update_instagram_cache_metadata_updated_at ON instagram_cache_metadata;
CREATE TRIGGER trigger_update_instagram_cache_metadata_updated_at
  BEFORE UPDATE ON instagram_cache_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_instagram_posts_updated_at();
