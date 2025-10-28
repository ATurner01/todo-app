'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
    return db.prepare("SELECT * FROM tasks").all();
}

export async function addTask(data) {

    try {

        if (!data.get('title')){
            throw new Error('Title is required');
        }
        
        const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
        stmt.run(data.get('title'), data.get('description'));
        
        revalidatePath('/');

        return { success: true, message: 'Task added successfully' };
        
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

        // const taskCompleted = db.prepare("SELECT completed FROM tasks WHERE id = ?").all(id);

        // if (taskCompleted) {
        //     throw new Error('Task already completed');
        // }

        const stmt = db.prepare('UPDATE tasks SET completed = 1 WHERE id = ?');
        stmt.run(id);

        revalidatePath('/');

        return { success: true, message: 'Task marked as completed' };
        
    } catch (error) {
        console.error('Error marking task as completed:', error);
        return { success: false, message: error.message || 'Failed to mark task as completed' };
    }
}