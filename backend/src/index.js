const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';



const taskRoutes = require('./routes/tasks');
const { errorHandler } = require('./middleware/errorHandler');
const { closeDb } = require('./db/pool');



app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  closeDb();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeDb();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`✓ Backend running at http://localhost:${PORT}`);
});
