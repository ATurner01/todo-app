import { TaskList } from "./todo";
import { CreateTask } from "./create";

export default function TodoApp() {
              
  return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen pt-10">
        <TaskList />
      </div>
      <div className="min-h-screen">
        <CreateTask />
      </div>
    </div>
  );
}
