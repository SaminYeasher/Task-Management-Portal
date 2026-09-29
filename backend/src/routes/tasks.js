const express = require('express');
const { getDb, saveDb } = require('../db/pool');
const {
  validateCreateTask,
  validateUpdateTask,
  validateId,
} = require('../middleware/validate');

const router = express.Router();


function resultToObjects(result) {
  if (!result || result.length === 0) return [];
  const stmt = result[0];
  return stmt.values.map((row) => {
    const obj = {};
    stmt.columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
}


router.post('/', validateCreateTask, async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;
    const db = await getDb();
    db.run(
      `INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)`,
      [title, description || null, priority, status || 'Pending']
    );
    // Get last inserted row
    const result = db.exec('SELECT * FROM tasks WHERE id = last_insert_rowid()');
    const task = resultToObjects(result)[0];
    saveDb();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});


router.get('/', async (req, res, next) => {
  try {
    const db = await getDb();
    const result = db.exec('SELECT * FROM tasks ORDER BY created_date DESC');
    const tasks = resultToObjects(result);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', validateId, async (req, res, next) => {
  try {
    const db = await getDb();
    const result = db.exec('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    const tasks = resultToObjects(result);
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(tasks[0]);
  } catch (err) {
    next(err);
  }
});


router.put('/:id', validateId, validateUpdateTask, async (req, res, next) => {
  try {
    const db = await getDb();
    const existingResult = db.exec('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    const existing = resultToObjects(existingResult);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, priority, status } = req.body;
    const current = existing[0];

    const updatedTitle = title !== undefined ? title : current.title;
    const updatedDescription = description !== undefined ? description : current.description;
    const updatedPriority = priority !== undefined ? priority : current.priority;
    const updatedStatus = status !== undefined ? status : current.status;

    db.run(
      `UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?`,
      [updatedTitle, updatedDescription, updatedPriority, updatedStatus, req.params.id]
    );

    const result = db.exec('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    const task = resultToObjects(result)[0];
    saveDb();
    res.json(task);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', validateId, async (req, res, next) => {
  try {
    const db = await getDb();
    const existingResult = db.exec('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    const existing = resultToObjects(existingResult);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    db.run('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    saveDb();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
