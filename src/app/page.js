'use client';

import { TaskList } from "./todo";
import { CreateTask } from "./create";
import { useState, useEffect } from "react";


export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
    .then((response) => response.json())
    .then((data) => setTasks(data));
  }, []);
              
  return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen pt-10">
        <TaskList tasks={tasks}/>
      </div>
      <div className="min-h-screen">
        <CreateTask />
      </div>
    </div>
  );
}
