import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'database.sqlite'));

const defaultStations = [
  { name: 'Estação 1' },
  { name: 'Estação 2' },
  { name: 'Estação 3' },
];

// Função para inicializar a tabela de estações
const initializeStationsTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      fillPercentage INTEGER DEFAULT 0,
      lastCollectionRequest DATETIME DEFAULT null,
      lastCollected DATETIME DEFAULT null
    )
  `);
};

// Função para inserir estações padrão
const insertDefaultStations = () => {
  const insert = db.prepare(`INSERT INTO stations (name) VALUES (?)`);
  defaultStations.forEach(station => insert.run(station.name));
};

// Inicializa a tabela de stations e insere estações padrão se necessário
initializeStationsTable();
const existingStations = db.prepare(`SELECT COUNT(*) FROM stations`).get() as { 'COUNT(*)': number };
if (existingStations['COUNT(*)'] === 0) {
  insertDefaultStations();
  console.log("Estações padrão inseridas.");
}

export async function GET() {
  const stations = db.prepare(`
    SELECT 
      id,
      name,
      fillPercentage,
      lastCollectionRequest,
      lastCollected
    FROM stations
  `).all();
  
  return NextResponse.json(stations);
}
