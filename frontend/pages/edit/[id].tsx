import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Task, TaskStatus } from '../../types/task';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description || '');
        setStatus(response.data.status);
        setDueDate(response.data.dueDate ? new Date(response.data.dueDate).toISOString().split('T')[0] : '');
      } catch (err) {
        setError('Failed to fetch task');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        title,
        description,
        status,
        dueDate: dueDate || null
      });
      router.push('/');
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!task) return <div className="text-center py-8">Task not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow">Edit Task</h1>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title*
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status*
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={() => router.push('/')} 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}