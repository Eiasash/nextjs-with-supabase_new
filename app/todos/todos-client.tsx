'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, CheckCircle2, Circle, Clock, Calendar } from 'lucide-react';

interface Todo {
  id: string;
  task: string;
  is_complete: boolean;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high';
  created_at: string;
  user_id: string;
}

export function TodosClient({ initialTodos, userId }: { initialTodos: Todo[]; userId: string }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const supabase = createClient();

  const addTodo = async () => {
    if (!newTask.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .insert([{ 
        task: newTask.trim(),
        is_complete: false,
        priority,
        due_date: dueDate || null,
        user_id: userId 
      }])
      .select()
      .single();

    if (!error && data) {
      setTodos([data, ...todos]);
      setNewTask('');
      setDueDate('');
      setPriority('medium');
    }
    setIsLoading(false);
  };

  const toggleTodo = async (id: string, isComplete: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !isComplete })
      .eq('id', id);

    if (!error) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, is_complete: !isComplete } : todo
      ));
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.is_complete;
    if (filter === 'completed') return todo.is_complete;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.is_complete).length;
  const completedTodos = todos.filter(todo => todo.is_complete).length;

  return (
    <div className="w-full space-y-6">
      {/* Add new todo form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Task
          </CardTitle>
          <CardDescription>
            Create a new task with optional priority and due date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTodo();
                }
              }}
              className="flex-1"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-40"
            />
          </div>
          <Button 
            onClick={addTodo} 
            disabled={!newTask.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </Button>
        </CardContent>
      </Card>

      {/* Stats and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4">
          <Badge variant="outline" className="px-3 py-1">
            <Circle className="w-3 h-3 mr-1" />
            {activeTodos} Active
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {completedTodos} Completed
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Todos list */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                {filter === 'completed' 
                  ? 'No completed tasks yet.' 
                  : filter === 'active' 
                  ? 'No active tasks. All done!' 
                  : 'No tasks yet. Create your first task above!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTodos.map((todo) => (
            <Card key={todo.id} className={`transition-opacity ${todo.is_complete ? 'opacity-60' : ''}`}>
              <CardContent className="flex items-center gap-3 py-4">
                <Checkbox
                  checked={todo.is_complete}
                  onCheckedChange={() => toggleTodo(todo.id, todo.is_complete)}
                  className="w-5 h-5"
                />
                <div className="flex-1 space-y-1">
                  <p className={`${todo.is_complete ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.task}
                  </p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {todo.due_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(todo.due_date)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(todo.created_at)}
                    </span>
                  </div>
                </div>
                {todo.priority && (
                  <Badge variant={getPriorityColor(todo.priority)}>
                    {todo.priority}
                  </Badge>
                )}
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}