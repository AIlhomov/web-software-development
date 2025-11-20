import { getTasks, getTask, createTask, updateTask, deleteTask } from "$lib/apis/tasksApi.js";

// Object keyed by todoId -> [{ id, todo_id, description, is_done, created_at }]
let taskState = $state({});

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        getTasks: (todoId) => {
            return taskState[todoId] ?? [];
        },
        loadTasks: async (todoId) => {
            const tasks = await getTasks(todoId);
            taskState[todoId] = tasks.map(task => ({
                id: task.id,
                todo_id: task.todo_id,
                name: task.description,
                description: task.description,
                is_done: task.is_done,
                created_at: task.created_at
            }));
        },
        loadTask: async (todoId, taskId) => {
            const task = await getTask(todoId, taskId);
            if (!taskState[todoId]) {
                taskState[todoId] = [];
            }
            const taskWithName = {
                id: task.id,
                todo_id: task.todo_id,
                name: task.description,
                description: task.description,
                is_done: task.is_done,
                created_at: task.created_at
            };
            const index = taskState[todoId].findIndex((t) => t.id === task.id);
            if (index >= 0) {
                taskState[todoId][index] = taskWithName;
            } else {
                taskState[todoId].push(taskWithName);
            }
            return taskWithName;
        },
        addTask: async (todoId, task) => {
            // Support both object and string for backwards compatibility
            let description, isDone;
            if (typeof task === "string") {
                description = task.trim();
                isDone = false;
            } else if (task && task.description !== undefined) {
                description = task.description.trim();
                isDone = task.is_done ?? false;
            }

            if (!description) return;

            const created = await createTask(todoId, { description, is_done: isDone });
            if (!taskState[todoId]) {
                taskState[todoId] = [];
            }
            taskState[todoId].push({
                id: created.id,
                todo_id: created.todo_id,
                name: created.description,
                description: created.description,
                is_done: created.is_done,
                created_at: created.created_at
            });
        },
        removeTask: async (todoId, taskId) => {
            if (!taskState[todoId]) return;
            await deleteTask(todoId, taskId);
            taskState[todoId] = taskState[todoId].filter((t) => t.id !== taskId);
        },
        toggleTaskDone: async (todoId, taskId) => {
            if (!taskState[todoId]) return;
            const task = taskState[todoId].find((t) => t.id === taskId);
            if (task) {
                const updatedTask = await updateTask(todoId, taskId, {
                    description: task.description,
                    is_done: !task.is_done
                });
                // Update all fields from the API response
                task.is_done = updatedTask.is_done;
                task.description = updatedTask.description;
                task.name = updatedTask.description;
            }
        },
        // optional: clear all tasks of a todo when that todo is removed
        removeAllForTodo: (todoId) => {
            if (taskState[todoId] !== undefined) {
                delete taskState[todoId];
            }
        },
    };
};

export { useTaskState };