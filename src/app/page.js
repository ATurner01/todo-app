import { TaskList } from "./todo";
import { CreateTask } from "./create";
import { getTasks } from "./actions";

export default async function TodoApp() {
  const tasks = await getTasks()
  const taskList = JSON.stringify(tasks);
              
  return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen">
        <TaskList tasks={taskList}/>
      </div>
      <div className="min-h-screen">
        <CreateTask />
      </div>
    </div>
  );
}
