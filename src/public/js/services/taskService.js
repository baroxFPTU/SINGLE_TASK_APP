export const taskService = (() => {
    const fetchNewTask = async (task) => {
        const data = {
            name: task.name,
            createdAt: task.createdAt,
        }

        const newTask = await fetch(`http://localhost:2703/api/task/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    }

    return {
        create: fetchNewTask,
    }
})();