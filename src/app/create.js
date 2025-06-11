'use client';

import { useState } from 'react';

function CreateTaskForm({ title, description, onSubmit, onTitleChange,       onDescriptionChange }) {
    return (
        <form className="flex flex-col items-center justify-center border p-4 rounded px-16" method="POST" onSubmit={onSubmit}>

            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">Create Task</h1>
            </div>

            <input name="title" type="text" placeholder="Task Title" className="mb-4 p-2 border rounded w-full" value={title} onChange={(e) => onTitleChange(e.target.value)} />

            <textarea name="description" placeholder="Task Description" className="mb-4 p-2 border rounded w-full" value={description} onChange={(e) => onDescriptionChange(e.target.value)}></textarea>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Task</button>
        </form>
    );
}

export function CreateTask( { onUpdate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(event) {

        event.preventDefault();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({ 
                                    title: title, 
                                    description: description 
                                    });

        const res = fetch('api/tasks', {
            method: 'POST',
            headers: headers,
            body: body
        });
        
        setTitle('');
        setDescription('');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <CreateTaskForm title={title} description={description} onSubmit={handleSubmit} onTitleChange={setTitle} onDescriptionChange={setDescription} />
        </div>
    );
}