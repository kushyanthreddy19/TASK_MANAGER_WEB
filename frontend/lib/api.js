// frontend/lib/api.js
export async function fetchTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function addTask(task) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

export async function updateTask(id, task) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, { method: "DELETE" });
}

export async function getTask(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const tasks = await res.json();
  return tasks.find(task => task.id === id);
}