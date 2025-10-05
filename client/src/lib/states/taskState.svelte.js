let initial = {};
if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem("tasks");
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") initial = parsed;
        } catch { }
    }
}

// Object keyed by todoId -> [{ id, name }]
let taskState = $state(initial);

const save = () => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(taskState));
    }
};

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        getTasks: (todoId) => {
            return taskState[todoId] ?? [];
        },
        addTask: (todoId, name) => {
            const trimmed = (name ?? "").toString().trim();
            if (!trimmed) return;
            if (!taskState[todoId]) {
                taskState[todoId] = [];
            }
            const list = taskState[todoId];
            const nextId = list.length ? Math.max(...list.map((t) => t.id)) + 1 : 1;
            list.push({ id: nextId, name: trimmed });
            save();
        },
        removeTask: (todoId, taskId) => {
            if (!taskState[todoId]) return;
            taskState[todoId] = taskState[todoId].filter((t) => t.id !== taskId);
            save();
        },
        // optional: clear all tasks of a todo when that todo is removed
        removeAllForTodo: (todoId) => {
            if (taskState[todoId] !== undefined) {
                delete taskState[todoId];
                save();
            }
        },
    };
};

export { useTaskState };