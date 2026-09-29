
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];

function validateCreateTask(req, res, next) {
  const { title, priority, description, status } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority is required and must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

 
  req.body.title = title.trim();
  if (description) req.body.description = description.trim();

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, priority, status, description } = req.body;

  const errors = [];

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title must be a non-empty string');
    }
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }


  if (title) req.body.title = title.trim();
  if (description) req.body.description = description.trim();

  next();
}

function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  req.params.id = id;
  next();
}

module.exports = { validateCreateTask, validateUpdateTask, validateId };
