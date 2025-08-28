'use client';

import { setCompleted } from "./actions";
import { useState, useRef } from "react";

function CompleteButton( { complete } ) {
    if (complete) {
        return (
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">Task Complete</button>
        )
    } else {
        return (
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Mark as Complete</button>
        )
    }
}

function Task({ id, title, description, completed }) {

    const formRef = useRef(null);

    async function handleClick(formData) {
        const res = await setCompleted(formData);

        if (res.success) {
            console.log("Task marked as complete.");
        } else {
            console.error(res.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center border-t p-4 px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
            </div>

            <p className="text">{description}</p>

            <div className="flex flex-row items-center justify-center">
                <form ref={formRef} action={handleClick} >

                    <input type="hidden" name="id" value={id} />
                    
                    <CompleteButton complete={completed} />
                </form>
            </div>
        </div>
    );
}

export function SelectedTask({ task }) {

    if (task === null) {
        return (
            <div>
                <h1>Task Title: Empty</h1>
                <p>Task description: Empty</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Task Title: {task.title}</h1>
            <p>Task description: {task.description}</p>
        </div>
    )
}

export function TaskList( { taskList, onTaskSelect } ) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    return (
        <div className="relative flex flex-col items-stretch justify-start border rounded h-screen overflow-y-auto overscroll-contain w-full">
            <h1 className="sticky top-0 bg-gray-100 shadow-md z-10 w-full text-center text-4xl font-bold underline p-4">Task List</h1>
            <ul className="list-none">
                {taskList.map(task => (
                    <li key={task.id} className="" onClick={() => onTaskSelect(task.id)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <Task id={task.id} title={task.title} description={task.description} completed={task.completed}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}