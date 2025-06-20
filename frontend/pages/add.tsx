import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TaskStatus } from '../types/task';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        title,
        description,
        status,
        dueDate: dueDate || null
      });
      router.push('/');
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 drop-shadow">Add New Task</h1>
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
            Save Task
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