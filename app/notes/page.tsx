import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { NotesClient } from './notes-client';

export default async function NotesPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/login');
  }

  // Fetch initial notes
  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-5">
      <div className="w-full">
        <h1 className="font-bold text-4xl mb-4">Notes</h1>
        <p className="text-muted-foreground">
          Create and manage your personal notes. All notes are private to your account.
        </p>
      </div>
      
      <NotesClient initialNotes={notes || []} userId={user.id} />
    </div>
  );
}