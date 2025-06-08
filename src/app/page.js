import { Task, TaskList } from "./todo";
import { CreateTask } from "./create";

export default function TodoApp() {

  const tasks = [
                <Task title="Task 1" description="This is task 1" key="1" />, 
                <Task title="Task 2" description="This is task 2" key="2" />, 
                <Task title="Task 3" description="This is task 3" key="3" />
              ]
              
  return (
    <div className="flex flex-row justify-evenly bg-gray-100">
      <div className="min-h-screen pt-10">
        <TaskList tasks={tasks} />
      </div>
      <div className="min-h-screen">
        <CreateTask />
      </div>
    </div>
  );
}
