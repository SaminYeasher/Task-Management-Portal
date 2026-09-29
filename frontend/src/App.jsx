import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import ConfirmDialog from './components/ConfirmDialog';
import EmptyState from './components/EmptyState';
import SkeletonRows from './components/SkeletonRows';
import Toast from './components/Toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  
  const [deletingTask, setDeletingTask] = useState(null);

  const [toasts, setToasts] = useState([]);


  function addToast(message, type = 'success') {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  async function handleSaveTask(formData) {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        addToast('Task updated successfully');
      } else {
        await createTask(formData);
        addToast('Task created successfully');
      }
      setShowModal(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      addToast(err.message, 'error');
      throw err; 
    }
  }

  function handleEditClick(task) {
    setEditingTask(task);
    setShowModal(true);
  }

  function handleCreateClick() {
    setEditingTask(null);
    setShowModal(true);
  }

  function handleDeleteClick(task) {
    setDeletingTask(task);
  }

  async function handleConfirmDelete() {
    if (!deletingTask) return;
    try {
      await deleteTask(deletingTask.id);
      addToast('Task deleted successfully');
      setDeletingTask(null);
      fetchTasks();
    } catch (err) {
      addToast(err.message, 'error');
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateTask(id, { status: newStatus });
      addToast(`Status updated to "${newStatus}"`);
      fetchTasks();
    } catch (err) {
      addToast(err.message, 'error');
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                  <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
                  <path d="M9 16l4 4 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="app-title">Task Portal</h1>
                <p className="app-subtitle">Manage your projects efficiently</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary header-create-btn" onClick={handleCreateClick}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="btn-label">New Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="container">
          {/* Stats bar */}
          {!loading && tasks.length > 0 && (
            <div className="stats-bar">
              <div className="stat">
                <span className="stat-value">{tasks.length}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat">
                <span className="stat-value stat-pending">{tasks.filter(t => t.status === 'Pending').length}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat">
                <span className="stat-value stat-in-progress">{tasks.filter(t => t.status === 'In Progress').length}</span>
                <span className="stat-label">In Progress</span>
              </div>
              <div className="stat">
                <span className="stat-value stat-completed">{tasks.filter(t => t.status === 'Completed').length}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          )}

          {/* Task list */}
          {loading ? (
            <div className="task-list">
              <SkeletonRows count={5} />
            </div>
          ) : error && tasks.length === 0 ? (
            <div className="error-state">
              <p>Failed to load tasks: {error}</p>
              <button className="btn btn-primary" onClick={fetchTasks}>Retry</button>
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState onCreateClick={handleCreateClick} />
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
        />
      )}

      {deletingTask && (
        <ConfirmDialog
          title="Delete Task"
          message={`Are you sure you want to delete "${deletingTask.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingTask(null)}
        />
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
