'use client';

import { setCompleted } from "./actions";
import { useRef } from "react";

function Task({ id, title, description }) {

    const formRef = useRef(null);

    async function handleClick(formData) {
        const res = await setCompleted(formData);

        if (res.success) {
            alert("Task marked as complete.");
        } else {
            alert(res.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center border p-4 rounded px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
            </div>

            <p className="text">{description}</p>

            <form ref={formRef} action={handleClick} >
                <input type="hidden" name="id" value={id} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Mark as Complete</button>
            </form>
        </div>
    );
}

export function TaskList( { tasks } ) {
    const taskList = JSON.parse(tasks)

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 underline">Task List</h1>
            <ul className="list-none">
                {taskList.map(task => (
                    <li key={task.id} className="mb-10">
                        <Task id={task.id} title={task.title} description={task.description}  />
                    </li>
                ))}
            </ul>
        </div>
    );
}