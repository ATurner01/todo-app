'use server';

import db from '@/lib/db';

export async function getTasks() {
    const tasks = db.prepare("SELECT * FROM tasks").all()
    return JSON.stringify(tasks);
}

export async function addTask(data) {

    try {

        if (!data.get('title')){
            throw new Error('Title is required');
        }
        
        const stmt = db.prepare('INSERT INTO tasks (title, description, date_created) VALUES (?, ?, ?)');

        const date = new Date().toISOString();
        const newTaskId = stmt.run(data.get('title'), data.get('description'), date);
        const newTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(newTaskId.lastInsertRowid);

        return { 
                success: true,
                message: 'Task added successfully',
                task: JSON.stringify(newTask)
            };
        
    } catch (error) {
        console.error('Error adding task:', error);
        return { success: false, message: error.message || 'Failed to add task' };
    }

}

export async function setCompleted(data) {

    try {
        const id = data['id'];
        if (!id) {
            throw new Error('Task ID is required');
        }

        // Flip the complete status
        const complete = data['completed'] === 0 ? 1 : 0;

        const stmt = db.prepare('UPDATE tasks SET completed = ? WHERE id = ?');
        stmt.run(complete, id);

        return { success: true, message: `Task complete status updated to: ${complete}` };
        
    } catch (error) {
        console.error('Error changing task complete status:', error);
        return { success: false, message: error.message || 'Failed to change task complete status' };
    }
}

export async function deleteTask(data) {

    try {
        const id = data['id'];
        if (!id) {
            throw new Error(`Task ID is required`);
        }

        const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) {
            throw new Error(`No task found with ID: ${id}`);
        }

        return {
            success: true,
            message: `Task with ID: ${id} deleted successfully`
        };
    }
    catch (error) {
        console.error('Error deleting task:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete task'
        };
    }
}