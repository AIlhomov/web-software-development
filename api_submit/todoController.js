import * as todoRepository from "./todoRepository.js";

const isInt = (n) => Number.isInteger(n);

export const create = async (c) => {
    const user = c.get("user");
    let body;
    try {
        body = await c.req.json();
    } catch {
        return c.json({ error: "Missing required fields" }, 400);
    }
    const name = body?.name?.toString().trim();
    if (!name) return c.json({ error: "Missing required fields" }, 400);

    try {
        const created = await todoRepository.create(user.id, { name });
        return c.json(created, 201);
    } catch (e) {
        return c.json({ error: "Internal Server Error" }, 500);
    }
};

export const readAll = async (c) => {
    const user = c.get("user");
    const todos = await todoRepository.findAll(user.id);
    return c.json(todos, 200);
};

export const readOne = async (c) => {
    const user = c.get("user");
    const id = Number(c.req.param("todoId"));
    if (!isInt(id)) return c.json({ error: "Invalid id" }, 400);

    const todo = await todoRepository.findById(user.id, id);
    if (!todo) return c.json({ error: "Todo not found" }, 404);
    return c.json(todo, 200);
};

export const update = async (c) => {
    const user = c.get("user");
    const id = Number(c.req.param("todoId"));
    if (!isInt(id)) return c.json({ error: "Invalid id" }, 400);

    // Check if todo exists and belongs to user first
    const existingTodo = await todoRepository.findById(user.id, id);
    if (!existingTodo) return c.json({ error: "Todo not found" }, 404);

    let body;
    try {
        body = await c.req.json();
    } catch {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const name = body?.name?.toString().trim();
    const created_at = body?.created_at;
    if (!name || !created_at) {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const updated = await todoRepository.updateById(user.id, id, { name, created_at });
    if (!updated) return c.json({ error: "Todo not found" }, 404);

    return c.json(updated, 200);
};

export const deleteOne = async (c) => {
    const user = c.get("user");
    const id = Number(c.req.param("todoId"));
    if (!isInt(id)) return c.json({ error: "Invalid id" }, 400);

    const deleted = await todoRepository.deleteById(user.id, id);
    if (!deleted) return c.json({ error: "Todo not found" }, 404);

    return c.json(deleted, 200);
};
