import { getTasks, createTask } from '@/lib/db';

export async function GET() {

    const tasks = getTasks();
    
    return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request) {
    
    const { title, description } = await request.json();
    createTask(String(title), String(description));

    return new Response(JSON.stringify({ message: 'Task created successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}