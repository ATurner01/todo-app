'use client';

import { setCompleted } from "./actions";
import { useState, useRef, useEffect } from "react";

function CompleteButton( { id, complete, completeRef, onUpdate } ) {
    if (complete) {
        return (
            <button id={id} type="submit" className="bg-green-500 text-white p-2 rounded mt-4" ref={completeRef}>Task Complete</button>
        )
    } else {
        return (
            <button id={id} type="submit" className="bg-blue-500 text-white p-2 rounded mt-4" ref={completeRef}
            onClick={() => markTaskComplete(id, onUpdate)}>
                Mark as Complete
            </button>
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

function NoTaskSelected() {
    return (
            <div className="relative flex flex-col items-center justify-center h-full w-full">
                <h1 className="flex flex-col items-center justify-center text-6xl font-bold h-full w-full">No task selected</h1>
            </div>
        )
}

function TaskFilterMenu( { onFilterChange } ) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setOpen(!open);

    //Create event listener and function for handling clicks outside of menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []); //Only need to run once on mount

    const options = ["All", "Completed", "Not Completed"];

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button onClick={toggleMenu} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Filter
            </button>

            {open && (
                <div className="absolute left-full top-0 ml-2 bg-white border rounded-md shadow-lg w-40">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => onFilterChange(option, setOpen)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                {option}
                            </button>
                    ))}
                </div>
            )}
        </div>
    );
}

async function markTaskComplete(taskId, onUpdate) {
    const res = await setCompleted({ id: taskId });
    
    if (res.success) {
        console.log("Task marked as complete.");
        onUpdate();
    } else {
        console.error(res.message);
    }
}

export function SelectedTask({ task, onUpdate }) {

    if (task === null) {
        return <NoTaskSelected />;
    }

    return (
        <div className="relative flex flex-col justify-start pt-4 h-full">
            <div className="border-b mb-4 w-full">
                <h1 className="flex flex-col items-center justify-center text-5xl font-bold mb-4 w-full">{task.title}</h1>
            </div>

            <div className="flex flex-col items-center justify-start w-full h-full">
                <div className="absolute flex items-start justify-start left-0 pl-4 pt-1">
                    <p>Date Created: {task.date_created !== null 
                    ? new Date(task.date_created).toLocaleDateString()
                    : "Date not provided"} </p>
                </div>
                <h2 className="text-2xl font-semibold underline mb-4">Description</h2>
                <p className="text-xl">{task.description}</p>
            </div>

            <div className="flex items-center justify-center w-full mb-4">
                <CompleteButton id={task.id} complete={task.completed} onUpdate={onUpdate}/>
            </div>
        </div>
    )
}

export function TaskList( { taskList, onTaskSelect, selectedTask, onRefetch } ) {
    const [displayedTasks, setDisplayedTasks] = useState(taskList);

    const handleFilterChange = (value, menu) => {

        switch (value) {
            case "All":
                setDisplayedTasks(taskList);
                break;
            case "Completed":
                setDisplayedTasks(taskList.filter(task => task.completed === 1));
                break;
            case "Not Completed":
                setDisplayedTasks(taskList.filter(task => task.completed === 0));
                break;
        }

        menu(false);
    }

    return (
        <div className="relative flex flex-col items-stretch justify-start border rounded h-screen overflow-y-auto overscroll-contain w-full">
            <div className="sticky top-0 bg-gray-100 shadow-md z-10 w-full p-4">
                <div className="absolute left-4 top-4">
                    <TaskFilterMenu onFilterChange={handleFilterChange}/>
                </div>
                <h1 className="text-center text-4xl font-bold underline">       Task List     
                </h1>
                <div className="absolute right-4 top-4">
                    <button onClick={onRefetch} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Refresh
                    </button>
                </div>
            </div>
            <ul className="list-none">
                {displayedTasks.map(task => (
                    <li key={task.id} className="" onClick={() => onTaskSelect(task.id)}>
                        <Task title={task.title} completed={task.completed}
                        isSelected={selectedTask !== null && selectedTask === task.id ? true : false}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}