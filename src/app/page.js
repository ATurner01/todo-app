import { TodoApp } from "./todo";
import { getTasks } from "./actions";

export default async function App() {
  const tasks = await getTasks()
  const taskList = JSON.stringify(tasks);
              
  return (
    <>
    <TodoApp tasks={taskList} />
    </>
  );
}
