let initial = [];
if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem("todos");
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) initial = parsed;
        } catch { }
    }
}

let todoState = $state(initial); // [{ id, name }]

const save = () => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("todos", JSON.stringify(todoState));
    }
};

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        addTodo: (name) => {
            const trimmed = (name ?? "").toString().trim();
            if (!trimmed) return;
            todoState.push({ id: todoState.length + 1, name: trimmed });
            save();
        },
        removeTodo: (id) => {
            todoState = todoState.filter((t) => t.id !== id);
            save();
        },
    };
};

export { useTodoState };