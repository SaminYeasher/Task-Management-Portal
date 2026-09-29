import { useState, useEffect } from 'react';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

export default function TaskModal({ task, onSave, onClose }) {
  const isEditing = !!task;

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
      });
    }
  }, [task]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!PRIORITIES.includes(form.priority)) errs.priority = 'Invalid priority';
    if (!STATUSES.includes(form.status)) errs.status = 'Invalid status';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await onSave({
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: form.priority,
        status: form.status,
      });
    } catch {
      setSaving(false);
    }
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">Title <span className="text-red-400">*</span></label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${errors.title ? 'form-input-error' : ''}`}
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">Description</label>
            <textarea
              id="task-description"
              className="form-input form-textarea"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add more details (optional)"
              rows={3}
            />
          </div>

          {/* Priority & Status row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">Priority <span className="text-red-400">*</span></label>
              <select
                id="task-priority"
                className={`form-input form-select ${errors.priority ? 'form-input-error' : ''}`}
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {errors.priority && <p className="form-error">{errors.priority}</p>}
            </div>

            {isEditing && (
              <div className="form-group">
                <label htmlFor="task-status" className="form-label">Status</label>
                <select
                  id="task-status"
                  className={`form-input form-select ${errors.status ? 'form-input-error' : ''}`}
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.status && <p className="form-error">{errors.status}</p>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <span className="spinner" />
                  Saving...
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
