'use client';

import { TaskList, SelectedTask } from "./task";
import { CreateTask } from "./create";
import { useState } from "react";
import { useTasks } from "./useTasks";

function ListLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="flex flex-col items-center justify-center text-6xl font-bold h-full w-full">Loading tasks...</h1>
    </div>
  )
}

export function TodoApp() {
  const { tasks, loading, refetch, updateNoRefetch } = useTasks();
  const [currentTask, setCurrentTask] = useState(null);

  function handleCurrentTask(taskId) {
    const selectedTask = tasks.find(task => task.id === taskId);

    if (typeof selectedTask !== 'undefined') {
      setCurrentTask(selectedTask);
    } else {
      console.error("Selected task could not be found.");
    }
  }

  return (
  <div className="flex flex-row justify-evenly bg-gray-100">
    <div className="min-h-screen w-1/2 h-full">
    {loading ? <ListLoading /> :
      <TaskList taskList={tasks} onTaskSelect={handleCurrentTask} selectedTask={currentTask !== null ? currentTask.id : null} onRefetch={refetch}/> }
    </div>
    <div className="relative min-h-screen w-1/2 h-full">
      <div className="absolute w-full h-3/5">
        <SelectedTask task={currentTask} onUpdate={refetch} />
      </div>
      <div className="absolute w-full h-2/5 bottom-0">
        <CreateTask refetch={updateNoRefetch} />
      </div>
    </div>
  </div>
  )
}