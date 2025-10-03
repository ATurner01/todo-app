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

function Task({ title, completed, isSelected }) {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    return (
        <div className={`flex flex-col items-center justify-center border-t p-4 px-16 ${isHovering && !isSelected ? "bg-gray-300" : ""} ${isHovering && completed && !isSelected ? "bg-green-300" : ""} ${isSelected ? "bg-blue-300" : ""} ${completed && !isSelected && !isHovering ? "bg-green-500" : ""}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="mb-6 mt-6">
                <h1 className="flex flex-col items-center justify-center text-4xl font-bold">{title}</h1>
            </div>
        </div>
    );
}

export function SelectedTask({ task }) {

    const formRef = useRef(null);

    async function handleClick(formData) {
        const res = await setCompleted(formData);

        if (res.success) {
            console.log("Task marked as complete.");
        } else {
            console.error(res.message);
        }
    }

    if (task === null) {
        return (
            <div className="relative flex flex-col items-center justify-center h-full w-full">
                <h1 className="flex flex-col items-center justify-center text-6xl font-bold h-full w-full">No task selected</h1>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col justify-start pt-4 h-full">
            <div className="border-b mb-4 w-full">
                <h1 className="flex flex-col items-center justify-center text-5xl font-bold mb-4 w-full">{task.title}</h1>
            </div>

            <div className="flex flex-col items-center justify-start w-full h-full">
                <div className="absolute flex items-start justify-start left-0 pl-4 pt-1">
                    <p>Date Created: 01/01/1979</p>
                </div>
                <h2 className="text-2xl font-semibold underline mb-4">Description</h2>
                <p className="text-xl">{task.description}</p>
            </div>

            <div className="flex items-center justify-center w-full mb-4">
                <form ref={formRef} action={handleClick} >

                    <input type="hidden" name="id" value={task.id} />
                        
                    <CompleteButton complete={task.completed} />
                </form>
            </div>
        </div>
    )
}

export function TaskList( { taskList, onTaskSelect, selectedTask } ) {

    return (
        <div className="relative flex flex-col items-stretch justify-start border rounded h-screen overflow-y-auto overscroll-contain w-full">
            <h1 className="sticky top-0 bg-gray-100 shadow-md z-10 w-full text-center text-4xl font-bold underline p-4">Task List</h1>
            <ul className="list-none">
                {taskList.map(task => (
                    <li key={task.id} className="" onClick={() => onTaskSelect(task.id)}>
                        <Task title={task.title} completed={task.completed}
                        isSelected={selectedTask !== null && selectedTask === task.id ? true : false}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}