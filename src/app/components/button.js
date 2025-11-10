import { setCompleted, deleteTask } from "../api/_internal/actions";

async function updateTaskCompletion(taskId, completeStatus, onUpdate) {
    const res = await setCompleted({ id: taskId, completed: completeStatus });
    
    if (res.success) {
        console.log("Task complete status updated.");
        onUpdate(taskId);
    } else {
        console.error(res.message);
    }
}

async function handleDeleteTask(taskId, onDelete) {
    const res = await deleteTask({ id: taskId });

    if (res.success) {
        console.log("Task deleted successfully.");
        onDelete(taskId);
    } else {
        console.error(res.message);
    }
}

export function CompleteButton( { id, complete, onUpdate } ) {
    if (complete) {
        return (
            <button id={id} type="submit" className="bg-green-500 text-white p-2 rounded mt-4"
            onClick={() => updateTaskCompletion(id, complete, onUpdate)}>
                Task Complete
            </button>
        )
    } else {
        return (
            <button id={id} type="submit" className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={() => updateTaskCompletion(id, complete, onUpdate)}>
                Mark as Complete
            </button>
        )
    }
}

export function DeleteButton( { id, onDelete } ) {
    return (
        <button id={id} type='submit' className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={() => handleDeleteTask(id, onDelete)}>
            Delete Task
        </button>
    )
}