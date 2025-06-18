'use client';

import { TaskList } from "./task";
import { CreateTask } from "./create";


export function TodoApp({ tasks }) {
    const taskList = JSON.parse(tasks)

    return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen w-1/2 h-full">
        <TaskList taskList={taskList}/>
      </div>
      <div className="relative min-h-screen w-1/2 h-full">
        <div className="absolute w-full h-3/5">
          {/*Use this area to display details on the selected task*/}
          <p>Test</p>
        </div>
        <div className="absolute w-full h-2/5 bottom-0">
          <CreateTask />
        </div>
      </div>
    </div>
    )
}