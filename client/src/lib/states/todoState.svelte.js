let todoState = $state([]); // [{ id, name }]

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        addTodo: (name) => {
            const trimmed = (name ?? '').toString().trim();
            if (!trimmed) return;
            todoState.push({ id: todoState.length + 1, name: trimmed });
        },
    };
};

export { useTodoState };
