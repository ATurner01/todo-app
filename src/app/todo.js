export function Task({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center border p-4 rounded px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
            </div>
            <p className="text">{description}</p>
        </div>
    );
}

export function TaskList( { tasks } ) {

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 underline">Task List</h1>
            <ul className="list-none">
                {tasks.map((task, _) => (
                    <li key={task.id} className="mb-10">
                        <Task title={task.title} description={task.description} />
                    </li>
                ))}
            </ul>
        </div>
    );
}