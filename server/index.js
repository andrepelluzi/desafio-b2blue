import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));
const app = express();

app.use(cors());
app.use(express.json());

// Função para inicializar a tabela de operações
const initializeOperationsTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stationId INTEGER NOT NULL,
      operationType TEXT NOT NULL,
      fillPercentage INTEGER,
      timestamp DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime'))
    )
  `);
};

// Função para inicializar a tabela de estações
const initializeStationsTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      fillPercentage INTEGER DEFAULT 0,
      lastCollected DATETIME DEFAULT null
    )
  `);
};

// Inicializa as tabelas
initializeOperationsTable();
initializeStationsTable();

// Get all operations
app.get('/api/operations', (req, res) => {
  const operations = db.prepare(`
    SELECT 
      id,
      stationId,
      operationType,
      fillPercentage,
      datetime(timestamp, 'localtime') as timestamp
    FROM operations 
    ORDER BY timestamp DESC
  `).all();
  res.json(operations);
});

// Get operations for a specific station
app.get('/api/operations/:stationId', (req, res) => {
  const operations = db.prepare(`
    SELECT 
      id,
      stationId,
      operationType,
      fillPercentage,
      datetime(timestamp, 'localtime') as timestamp
    FROM operations 
    WHERE stationId = ? 
    ORDER BY timestamp DESC
  `).all(req.params.stationId);
  res.json(operations);
});

// Record new operation
app.post('/api/operations', (req, res) => {
  const { stationId, operationType, fillPercentage } = req.body;
  
  const insert = db.prepare(`
    INSERT INTO operations (stationId, operationType, fillPercentage)
    VALUES (?, ?, ?)
  `);
  
  const result = insert.run(stationId, operationType, fillPercentage);
  res.json({ id: result.lastInsertRowid });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});