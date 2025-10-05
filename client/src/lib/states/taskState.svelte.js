let taskState = $state({}); // Initially empty

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        getTasks: (todoId) => {
            return taskState[todoId] ?? [];
        },
        addTask: (todoId, name) => {
            const trimmed = (name ?? '').toString().trim();
            if (!trimmed) return;
            if (!taskState[todoId]) {
                taskState[todoId] = [];
            }
            const list = taskState[todoId];
            const nextId = list.length ? Math.max(...list.map(t => t.id)) + 1 : 1;
            list.push({ id: nextId, name: trimmed });
        },
    };
};

export { useTaskState };