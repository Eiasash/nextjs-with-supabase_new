'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Note {
  id: string;
  title: string;
  content?: string;
  created_at: string;
  user_id: string;
}

export function NotesClient({ initialNotes, userId }: { initialNotes: Note[]; userId: string }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const addNote = async () => {
    if (!newNoteTitle.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .insert([{ 
        title: newNoteTitle.trim(), 
        content: newNoteContent.trim(),
        user_id: userId 
      }])
      .select()
      .single();

    if (!error && data) {
      setNotes([data, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
    setIsLoading(false);
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (!error) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Add new note form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Note
          </CardTitle>
          <CardDescription>
            Create a new note to keep track of your thoughts and ideas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Note title..."
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addNote();
              }
            }}
          />
          <textarea
            className="w-full p-3 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Note content (optional)..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={addNote} 
            disabled={!newNoteTitle.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Adding...' : 'Add Note'}
          </Button>
        </CardContent>
      </Card>

      {/* Notes list */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Your Notes
          <Badge variant="secondary">{notes.length}</Badge>
        </h2>
        
        {notes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                No notes yet. Create your first note above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="pr-8">{note.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(note.created_at)}
                  </CardDescription>
                </CardHeader>
                {note.content && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {note.content}
                    </p>
                  </CardContent>
                )}
                <Button
                  onClick={() => deleteNote(note.id)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}