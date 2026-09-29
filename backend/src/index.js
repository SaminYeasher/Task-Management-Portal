const express = require('express');
const cors = require('cors');
const { closeDb, getDb } = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';


app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());


app.get('/health', async (req, res) => {
  try {
    await getDb(); 
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


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
