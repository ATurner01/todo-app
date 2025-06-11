'use client';
import { useEffect, useState } from "react";

export function Task({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center border p-4 rounded px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
            </div>
            <p className="text">{description}</p>
        </div>
    );
}

export function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 underline">Task List</h1>
            <ul className="list-none">
                {tasks.map((task, index) => (
                    <li key={index} className="mb-10">
                        <Task title={task.title} description={task.description} />
                    </li>
                ))}
            </ul>
        </div>
    );
}