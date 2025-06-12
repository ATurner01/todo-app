'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

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