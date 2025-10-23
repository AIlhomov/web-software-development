import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const getTodos = async () => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos`);
    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    return await response.json();
};

const getTodo = async (todoId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch todo");
    }
    return await response.json();
};

const createTodo = async (todo) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos`, {
        method: "POST",
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error("Failed to create todo");
    }
    return await response.json();
};

const updateTodo = async (todoId, todo) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error("Failed to update todo");
    }
    return await response.json();
};

const deleteTodo = async (todoId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }
    return await response.json();
};

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
