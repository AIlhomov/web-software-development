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
        addTodo: (todo) => {
            // Support both object and string for backwards compatibility
            let name;
            if (typeof todo === "string") {
                name = todo.trim();
            } else if (todo && todo.name) {
                name = todo.name.trim();
            }

            if (!name) return;

            const nextId = todoState.length ? Math.max(...todoState.map((t) => t.id)) + 1 : 1;
            todoState.push({ id: nextId, name: name });
            save();
        },
        removeTodo: (id) => {
            todoState = todoState.filter((t) => t.id !== id);
            save();
        },
    };
};

export { useTodoState };