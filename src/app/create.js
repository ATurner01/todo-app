'use client';

function CreateTaskForm({ onSubmit }) {
    return (
        <form className="flex flex-col items-center justify-center border p-4 rounded px-16">
            <div className="border-b mb-4">
                <h1 className="text-4xl font-bold mb-6">Create Task</h1>
            </div>
            <input name="title" type="text" placeholder="Task Title" className="mb-4 p-2 border rounded w-full" />
            <textarea name="description" placeholder="Task Description" className="mb-4 p-2 border rounded w-full"></textarea>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={onSubmit}>Create Task</button>
        </form>
    );
}

export function CreateTask() {

    function handleSubmit() {
        console.log("Create button clicked");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <CreateTaskForm onSubmit={handleSubmit}/>
        </div>
    );
}