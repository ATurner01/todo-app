'use client';

import { useState } from "react";
import { MenuComponent } from "./menu";
import { CompleteButton, DeleteButton } from "./button";
import { applyFilter, applySort } from "@/lib/utils";

function Task({ title, completed, isSelected }) {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    return (
        <div className={`flex flex-col items-center justify-center border-b p-4 px-16 ${isHovering && !isSelected ? "bg-gray-300" : ""} ${isHovering && completed && !isSelected ? "bg-green-300" : ""} ${isSelected ? "bg-blue-300" : ""} ${completed && !isSelected && !isHovering ? "bg-green-500" : ""}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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

export function SelectedTask({ taskList, taskId, onUpdate, onDelete }) {

    const task = taskList.find(t => t.id === taskId) || null;
    
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
                <div className="absolute left-80 bottom-4">
                    <CompleteButton id={task.id} complete={task.completed} onUpdate={onUpdate}/>
                </div>
                <div className="absolute right-80 bottom-4">
                    <DeleteButton id={task.id} onDelete={onDelete}/>
                </div>
            </div>
        </div>
    )
}

function TaskListHeader( { filterOptions , sortOptions , handleOptionChange , onRefetch } ) {
    return (
        <div className="sticky top-0 bg-gray-100 shadow-md z-10 w-full border-b p-4">
            <div className="absolute left-4 top-4">
                <MenuComponent name={"Filter"} options={filterOptions} onOptionChange={handleOptionChange}/>
            </div>
            <div className="absolute left-32 top-4">
                <MenuComponent name={"Sort"} options={sortOptions} onOptionChange={handleOptionChange}/>
            </div>
            <h1 className="text-center text-4xl font-bold underline">       
                Task List     
            </h1>
            <div className="absolute right-4 top-4">
                <button onClick={onRefetch} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Refresh
                </button>
            </div>
        </div>
    )
}

function TaskListItems({ displayedTasks , onTaskSelect, selectedTask }) {
    return (
        <ul className="list-none">
            {displayedTasks.map(task => (
                <li key={task.id} className="" onClick={() => onTaskSelect(task.id)}>
                    <Task title={task.title} completed={task.completed}
                    isSelected={selectedTask !== null && selectedTask === task.id ? true : false}/>
                </li>
            ))}
        </ul>
    )
}

export function TaskList( { taskList, onTaskSelect, selectedTask, onRefetch } ) {
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Date Created");

    const filterOptions = ["All", "Completed", "Incomplete"];
    const sortOptions = ["Date Created", "Title"];

    const handleOptionChange = (value, menu) => {
        if (filterOptions.includes(value)) {
            setFilter(value);
        }

        if (sortOptions.includes(value)) {
            setSort(value);
            console.log("Sorting by:", value);
        }

        menu(false);
    }

    const displayedTasks = applySort(applyFilter(taskList, filter), sort);

    return (
        <div className="relative flex flex-col items-stretch justify-start border rounded h-screen overflow-y-auto overscroll-contain w-full">
            <TaskListHeader filterOptions={filterOptions} sortOptions={sortOptions} handleOptionChange={handleOptionChange} onRefetch={onRefetch} />
            <TaskListItems displayedTasks={displayedTasks} onTaskSelect={onTaskSelect} selectedTask={selectedTask} />
        </div>
    );
}