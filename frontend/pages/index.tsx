import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Task } from '../types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg"></div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">Task Manager</h1>
        <div className="flex justify-end mb-6">
          <Link href="/add" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Add New Task
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold
                    ${task.status === 'todo' ? 'bg-gray-200 text-gray-800' :
                      task.status === 'in_progress' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  {task.dueDate && (
                    <span className="ml-3 text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/edit/${task.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}