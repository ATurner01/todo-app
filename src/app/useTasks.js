import { useEffect, useState } from "react";
import { getTasks } from "./actions";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

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
    }, []);

    return { tasks, loading };
}