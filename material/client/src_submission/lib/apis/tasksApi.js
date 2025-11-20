import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const getTasks = async (todoId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`);
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return await response.json();
};

const getTask = async (todoId, taskId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }
    return await response.json();
};

const createTask = async (todoId, task) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to create task");
    }
    return await response.json();
};

const updateTask = async (todoId, taskId, task) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
    return await response.json();
};

const deleteTask = async (todoId, taskId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
    return await response.json();
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
