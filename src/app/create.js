'use client';

import { useState } from 'react';
import { addItem } from './actions';

function CreateTaskForm({ title, description, onTitleChange,       onDescriptionChange }) {
    return (
        <form className="flex flex-col items-center justify-center border p-4 rounded px-16" action={addItem}>

            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">Create Task</h1>
            </div>

            <input name="title" type="text" placeholder="Task Title" className="mb-4 p-2 border rounded w-full" value={title} onChange={(e) => onTitleChange(e.target.value)} />

            <textarea name="description" placeholder="Task Description" className="mb-4 p-2 border rounded w-full" value={description} onChange={(e) => onDescriptionChange(e.target.value)}></textarea>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Task</button>
        </form>
    );
}

export function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <CreateTaskForm title={title} description={description} onTitleChange={setTitle} onDescriptionChange={setDescription} />
        </div>
    );
}