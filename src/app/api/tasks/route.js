'use server';

import db from '@/lib/db';

// API routes not needed for server actions, but keeping incase we want API calls in the future
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