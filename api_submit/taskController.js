import * as taskRepository from "./taskRepository.js";

const isInt = (n) => Number.isInteger(n);

export const create = async (c) => {
    const todoId = Number(c.req.param("todoId"));
    if (!isInt(todoId)) return c.json({ error: "Invalid todo id" }, 400);

    let body;
    try {
        body = await c.req.json();
    } catch {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const description = body?.description?.toString().trim();
    if (!description) return c.json({ error: "Missing required fields" }, 400);

    const created = await taskRepository.create(todoId, { description });

    if (Object.prototype.hasOwnProperty.call(body, "is_done")) {
        const updated = await taskRepository.updateById(created.id, {
            description: created.description,
            is_done: Boolean(body.is_done),
        });
        return c.json(updated, 201);
    }

    return c.json(created, 201);
};

export const readAll = async (c) => {
    const todoId = Number(c.req.param("todoId"));
    if (!isInt(todoId)) return c.json({ error: "Invalid todo id" }, 400);

    const tasks = await taskRepository.findAll(todoId);
    return c.json(tasks, 200);
};

export const readOne = async (c) => {
    const taskId = Number(c.req.param("taskId"));
    if (!isInt(taskId)) return c.json({ error: "Invalid task id" }, 400);

    const task = await taskRepository.findById(taskId);
    if (!task) return c.json({ error: "Task not found" }, 404);

    return c.json(task, 200);
};

export const update = async (c) => {
    const taskId = Number(c.req.param("taskId"));
    if (!isInt(taskId)) return c.json({ error: "Invalid task id" }, 400);

    let body;
    try {
        body = await c.req.json();
    } catch {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const description = body?.description?.toString().trim();
    const hasIsDone = Object.prototype.hasOwnProperty.call(body, "is_done");

    if (!description || !hasIsDone || typeof body.is_done !== "boolean") {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const updated = await taskRepository.updateById(taskId, {
        description,
        is_done: body.is_done,
    });

    if (!updated) return c.json({ error: "Task not found" }, 404);

    return c.json(updated, 200);
};

export const deleteOne = async (c) => {
    const taskId = Number(c.req.param("taskId"));
    if (!isInt(taskId)) return c.json({ error: "Invalid task id" }, 400);

    const deleted = await taskRepository.deleteById(taskId);
    if (!deleted) return c.json({ error: "Task not found" }, 404);

    return c.json(deleted, 200);
};
