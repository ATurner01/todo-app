import db from '@/lib/db';

export async function GET() {

    const stmt = db.prepare('SELECT * FROM tasks');
    const tasks = stmt.all();
    
    return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request) {
    
    const { title, description } = await request.json();
    const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)')

    stmt.run(title, description);

    return new Response(JSON.stringify({ message: 'Task created successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}