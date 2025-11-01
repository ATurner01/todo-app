'use client';

import { useRef, useState } from 'react';
import { addTask } from './actions';

function CreateTaskForm( { onCreate } ) {

    const formRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmit(formData) {
        const result = await addTask(formData);

        if (result.success) {
            formRef.current?.reset();
            setSuccessMessage("");
            onCreate();
        } else {
            setSuccessMessage("Error: Task requires a title.");
        }
    }

    return (
        <form ref={formRef} className="relative flex flex-col items-stretch justify-start border-t p-4 px-16 h-full" action={handleSubmit}>

            <div className="border-b mb-4">
                <h1 className="text-4xl text-center font-bold mb-6">Create Task</h1>
            </div>

            <input name="title" type="text" placeholder="Task Title (Required)" className="mb-4 p-2 border rounded w-full" />

            <textarea name="description" placeholder="Task Description (Optional)" className="mb-4 p-2 border rounded w-full"></textarea>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded" >Create Task</button>

            <p className="text-red-500 mt-4">{successMessage}</p>
        </form>
    );
}

export function CreateTask( { refetch } ) {
    return (
        <div className="items-stretch bg-gray-100 h-full">
            <CreateTaskForm onCreate={refetch} />
        </div>
    );
}