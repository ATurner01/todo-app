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

export function createTask(title, description) {
  const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');

  stmt.run(title, description, (err) => {
    if (err) {
      console.error('Error inserting task:', err.message);
    } else {
      console.log('Task created successfully.');
    }
  });
}

export function getTasks() {
  const stmt = db.prepare('SELECT * FROM tasks');
  const tasks = [];

  stmt.all((err, rows) => {
    if (err) {
      console.error('Error fetching tasks:', err.message);
    } else {
      rows.forEach((row) => {
        tasks.push(row);
      });
    }
  });
  
  return tasks;
}

export default db;