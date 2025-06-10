import db from '/@lib/db';

export async function GET() {

    const tasks = db.getTasks();
    
    return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request) {
    
    const { title, description } = await request.json();
    db.createTask(title, description);

    return new Response(JSON.stringify({ message: 'Task created successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}