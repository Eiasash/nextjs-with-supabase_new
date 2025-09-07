import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { TodosClient } from './todos-client';

export default async function TodosPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/auth/login');
  }

  // Fetch initial todos
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-5">
      <div className="w-full">
        <h1 className="font-bold text-4xl mb-4">Todo List</h1>
        <p className="text-muted-foreground">
          Manage your tasks and stay organized. Mark items as complete when done.
        </p>
      </div>
      
      <TodosClient initialTodos={todos || []} userId={user.id} />
    </div>
  );
}