'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addItem(data) {
    
    const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
    stmt.run(data.get('title'), data.get('description'));
    
    revalidatePath('/src/app');
}