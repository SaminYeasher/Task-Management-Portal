export default function EmptyState({ onCreateClick }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="18" width="56" height="44" rx="6" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" />
          <path d="M40 30v20M30 40h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="empty-state-title">No tasks yet</h2>
      <p className="empty-state-text">
        Create your first task to get started with organizing your projects.
      </p>
      <button className="btn btn-primary" onClick={onCreateClick}>
        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Create Task
      </button>
    </div>
  );
}
