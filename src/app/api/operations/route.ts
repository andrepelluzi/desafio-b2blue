import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'database.sqlite'));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stationId INTEGER NOT NULL,
    operationType TEXT NOT NULL,
    fillPercentage INTEGER,
    timestamp DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now', 'localtime'))
  )
`);

export async function GET() {
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
  
  return NextResponse.json(operations);
}

// Função para inserir uma nova operação
const insertOperation = (stationId: number, operationType: string, fillPercentage?: number) => {
  const insert = db.prepare(`
    INSERT INTO operations (stationId, operationType, fillPercentage)
    VALUES (?, ?, ?)
  `);
  return insert.run(stationId, operationType, fillPercentage);
};

export async function POST(request: Request) {
  const body = await request.json();
  const { stationId, operationType, fillPercentage } = body;

  // Insere a operação principal
  const result = insertOperation(stationId, operationType, fillPercentage).lastInsertRowid;

  // Atualiza a tabela stations com base no tipo de operação
  const updateStation = db.prepare(`
    UPDATE stations 
    SET fillPercentage = ?, lastCollectionRequest = CASE WHEN ? >= 80 THEN datetime('now', 'localtime') ELSE lastCollectionRequest END
    WHERE id = ?
  `);
  
  if (operationType === 'update_fill') {
    updateStation.run(fillPercentage, fillPercentage, stationId);
  } else if (operationType === 'collection') {
    const resetStation = db.prepare(`
      UPDATE stations 
      SET fillPercentage = 0, lastCollectionRequest = NULL, lastCollected = datetime('now', 'localtime')
      WHERE id = ?
    `);
    resetStation.run(stationId);
  }

  // Verifica se fillPercentage > 80 e registra uma nova operação do tipo "request"
  if (fillPercentage >= 80) {
    insertOperation(stationId, 'request', fillPercentage);
  }

  return NextResponse.json({ id: result });
}