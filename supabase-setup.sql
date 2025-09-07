-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies for notes
-- Users can only see their own notes
CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own notes
CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own notes
CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own notes
CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for todos
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies for todos
CREATE POLICY "Users can view own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own todos" ON todos
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for todos
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_todos_is_complete ON todos(is_complete);

-- Create trigger for todos updated_at
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (these will only be visible to the user who owns them)
-- Note: You'll need to replace 'your-user-id' with an actual user ID after signing up
-- These are just examples to show the structure
/*
INSERT INTO notes (user_id, title, content) VALUES
  ('your-user-id', 'Welcome to Notes!', 'This is your first note. You can create, edit, and delete notes.'),
  ('your-user-id', 'Getting Started with Supabase', 'Supabase provides a powerful backend for your applications with authentication, database, and real-time features.'),
  ('your-user-id', 'Next.js Tips', 'Next.js 14 introduces the App Router with improved performance and developer experience.')
;

INSERT INTO todos (user_id, task, priority, due_date) VALUES
  ('your-user-id', 'Set up Supabase project', 'high', CURRENT_DATE + INTERVAL '1 day'),
  ('your-user-id', 'Learn about Row Level Security', 'medium', CURRENT_DATE + INTERVAL '3 days'),
  ('your-user-id', 'Build awesome features', 'medium', CURRENT_DATE + INTERVAL '7 days'),
  ('your-user-id', 'Deploy to production', 'low', CURRENT_DATE + INTERVAL '14 days')
;
*/