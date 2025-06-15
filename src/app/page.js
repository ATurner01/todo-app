import { TaskList } from "./todo";
import { CreateTask } from "./create";
import { getTasks } from "./actions";

export default async function TodoApp() {
  const tasks = await getTasks()
  const taskList = JSON.stringify(tasks);
              
  return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen w-1/2 h-full">
        <TaskList tasks={taskList}/>
      </div>
      <div className="relative min-h-screen w-1/2 h-full">
        <div className="absolute w-full h-3/5">
          <p>Test</p>
        </div>
        <div className="absolute w-full h-2/5 bottom-0">
          <CreateTask />
        </div>
      </div>
    </div>
  );
}
