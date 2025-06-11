import { TaskList } from "./todo";
import { CreateTask } from "./create";
import db from "@/lib/db";


export default function TodoApp() {
  const tasks = db.prepare('SELECT * FROM tasks').all();
              
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
