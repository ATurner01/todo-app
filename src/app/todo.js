'use client';

import { setCompleted } from './actions';

export function Task({ title, description, onCompleteClick }) {
    return (
        <div className="flex flex-col items-center justify-center border p-4 rounded px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
            </div>
            <p className="text">{description}</p>
            <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={onCompleteClick}>Mark as Completed</button>
        </div>
    );
}

export function TaskList( { tasks } ) {
    
    async function handleClick(taskId) {
        const data = new FormData();
        data.append('id', taskId);

        const response = await setCompleted(data);

        if (response.success) {
            console.log(response.message);
        } else {
            console.error('Error:', response.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 underline">Task List</h1>
            <ul className="list-none">
                {tasks.map((task, _) => (
                    <li key={task.id} className="mb-10">
                        <Task title={task.title} description={task.description} onCompleteClick={() => handleClick(task.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}