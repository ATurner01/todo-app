'use client';
import { useEffect, useRef } from "react";

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

export function TaskList({ tasks }) {
    const tasksList = useRef([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((data) => {
                console
                tasksList.current = data.map((task) => (
                    [task.title, task.description]
                ));
            })
        
        console.log('Tasks fetched:', tasksList.current);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 underline">Task List</h1>
            <ul className="list-none">
                {tasks.map((task, index) => (
                    <li key={index} className="mb-10">
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    );
}