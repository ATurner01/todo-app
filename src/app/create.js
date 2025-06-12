'use client';

import { useRef, useState } from 'react';
import { addTask } from './actions';

function CreateTaskForm() {

    const formRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmit(formData) {
        const result = await addTask(formData);

        if (result.success) {
            formRef.current?.reset();
            setSuccessMessage("");
        } else {
            setSuccessMessage("Error: Task requires a title.");
        }
    }

    return (
        <form ref={formRef} className="flex flex-col items-center justify-center border p-4 rounded px-16" action={handleSubmit}>

            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">Create Task</h1>
            </div>

            <input name="title" type="text" placeholder="Task Title (Required)" className="mb-4 p-2 border rounded w-full" />

            <textarea name="description" placeholder="Task Description (Optional)" className="mb-4 p-2 border rounded w-full"></textarea>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Task</button>

            {successMessage && <p className="text-red-500 mt-4">{successMessage}</p>}
        </form>
    );
}

export function CreateTask() {
    // Could be condensed into CreateTaskForm, but keeping it separate for clarity and legacy reasons
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <CreateTaskForm />
        </div>
    );
}