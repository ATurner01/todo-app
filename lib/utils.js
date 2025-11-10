export function applyFilter( taskList, filter ) {
    if (filter === "All") {
        return taskList;
    } else if (filter === "Completed") {
        return taskList.filter(task => task.completed);
    } else if (filter === "Incomplete") {
        return taskList.filter(task => !task.completed);
    } else {
        return taskList;
    }
}

export function applySort( taskList, sort ) {
    if (sort === "Date Created") {
        return taskList; // Assuming original order is by date created
    } else if (sort === "Title") {
        return [...taskList].sort((a, b) => a.title.localeCompare(b.title));
    } else {
        return taskList;
    }
}