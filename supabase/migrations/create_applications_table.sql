CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS) on the table
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to insert data
CREATE POLICY "Allow anon insert" ON applications FOR INSERT WITH CHECK (true);
