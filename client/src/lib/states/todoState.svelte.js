let todoState = $state([]);

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
        getOne: (id) => {
            //console.log("Getting todo with id:", id);
            console.log("Current todoState:", todoState);
            return todoState.find((t) => t.id === id);
        },
    };
};

export { useTodoState };