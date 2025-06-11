import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT null,
     description TEXT,
     completed BOOLEAN DEFAULT FALSE)
`);

export default db;