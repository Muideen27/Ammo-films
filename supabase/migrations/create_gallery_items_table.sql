CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS gallery_items_display_order_idx ON gallery_items (display_order ASC);
CREATE INDEX IF NOT EXISTS gallery_items_featured_idx ON gallery_items (featured);
CREATE INDEX IF NOT EXISTS gallery_items_category_idx ON gallery_items (category);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Public gallery items are viewable by everyone." ON gallery_items FOR SELECT USING (true);

-- Optional: Policy to allow authenticated users to insert/update their own gallery items
-- This would require authentication setup and potentially a 'user_id' column
-- For now, we'll stick to public read and admin-managed writes as per the prompt.
