import { useEffect, useState } from "react";
import { getTasks } from "../server/actions";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        
        async function fetchTasks() {

            try {
                setLoading(true);
                const fetchedTasks = await getTasks();
                setTasks(JSON.parse(fetchedTasks))
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, [refresh]);

    const refetch = () => { 
        setRefresh((prev) => prev + 1);
        console.log("Refetching tasks...");
    };

    const updateNoRefetch = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);   
    }

    const updateCompleteState = (taskId) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    }

    const deleteTaskFromState = (taskId) => {
        setTasks(prevTasks => 
            prevTasks.filter(task => task.id !== taskId)
        );
    }

    return { tasks, loading, refetch, updateNoRefetch, updateCompleteState, deleteTaskFromState };
}