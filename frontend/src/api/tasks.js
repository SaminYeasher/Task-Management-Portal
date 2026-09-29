const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data.error || data.details?.join(', ') || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}

export function getTasks() {
  return request('/tasks');
}

export function getTask(id) {
  return request(`/tasks/${id}`);
}

export function createTask(task) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export function updateTask(id, updates) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
