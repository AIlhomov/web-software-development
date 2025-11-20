import { getTodos, getTodo, createTodo, deleteTodo } from "$lib/apis/todosApi.js";

let todoState = $state([]); // [{ id, name, created_at }]

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        loadTodos: async () => {
            const todos = await getTodos();
            todoState = todos;
        },
        loadTodo: async (todoId) => {
            const todo = await getTodo(todoId);
            // Update or add the todo in the state
            const index = todoState.findIndex((t) => t.id === todo.id);
            if (index >= 0) {
                todoState[index] = todo;
            } else {
                todoState.push(todo);
            }
            return todo;
        },
        addTodo: async (todo) => {
            // Support both object and string for backwards compatibility
            let name;
            if (typeof todo === "string") {
                name = todo.trim();
            } else if (todo && todo.name) {
                name = todo.name.trim();
            }

            if (!name) return;

            const created = await createTodo({ name });
            todoState.push(created);
        },
        removeTodo: async (id) => {
            await deleteTodo(id);
            todoState = todoState.filter((t) => t.id !== id);
        },
    };
};

export { useTodoState };