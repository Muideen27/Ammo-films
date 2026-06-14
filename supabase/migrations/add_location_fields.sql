-- Add 'country' column with a default value for existing rows
ALTER TABLE applications
ADD COLUMN country TEXT NOT NULL DEFAULT 'Nigeria';

-- Make 'city' column nullable
ALTER TABLE applications
ALTER COLUMN city DROP NOT NULL;

-- Ensure 'state' column is NOT NULL (already is, but good for explicit migration)
ALTER TABLE applications
ALTER COLUMN state SET NOT NULL;
