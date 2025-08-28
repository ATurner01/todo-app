'use client';

import { TaskList, SelectedTask } from "./task";
import { CreateTask } from "./create";
import { useState } from "react";


export function TodoApp({ tasks }) {
  const taskList = JSON.parse(tasks)
  const [currentTask, setCurrentTask] = useState(null);

  function handleCurrentTask(taskId) {
    const selectedTask = taskList.find(task => task.id === taskId);

    if (typeof selectedTask !== 'undefined') {
      setCurrentTask(selectedTask);
    } else {
      console.error("Selected task could not be found.");
    }
  }

  return (
  <div className="flex flex-row justify-evenly bg-gray-100">
    <div className="min-h-screen w-1/2 h-full">
      <TaskList taskList={taskList} onTaskSelect={handleCurrentTask} selectedTask={currentTask !== null ? currentTask.id : null}/>
    </div>
    <div className="relative min-h-screen w-1/2 h-full">
      <div className="absolute w-full h-3/5">
        <SelectedTask task={currentTask} />
      </div>
      <div className="absolute w-full h-2/5 bottom-0">
        <CreateTask />
      </div>
    </div>
  </div>
  )
}