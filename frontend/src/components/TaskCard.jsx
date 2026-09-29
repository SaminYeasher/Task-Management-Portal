const PRIORITY_CONFIG = {
  Low: { color: 'var(--priority-low)', label: 'Low' },
  Medium: { color: 'var(--priority-medium)', label: 'Medium' },
  High: { color: 'var(--priority-high)', label: 'High' },
};

const STATUS_CONFIG = {
  Pending: { className: 'status-pending', label: 'Pending' },
  'In Progress': { className: 'status-in-progress', label: 'In Progress' },
  Completed: { className: 'status-completed', label: 'Completed' },
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.Pending;

  const formattedDate = new Date(task.created_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'task-completed' : ''}`}>
      {/* Priority indicator */}
      <div className="task-priority-bar" style={{ backgroundColor: priority.color }} />

      <div className="task-card-body">
        <div className="task-card-header">
          <div className="task-card-title-row">
            <span className="priority-dot" style={{ backgroundColor: priority.color }} title={priority.label} />
            <h3 className="task-title">{task.title}</h3>
          </div>
          <div className="task-card-actions">
            <button className="icon-btn" onClick={() => onEdit(task)} title="Edit task" aria-label="Edit task">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button className="icon-btn icon-btn-danger" onClick={() => onDelete(task)} title="Delete task" aria-label="Delete task">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-card-footer">
          {/* Status selector */}
          <select
            className={`status-pill ${status.className}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <span className="task-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
