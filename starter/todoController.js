import * as todoRepository from "./todoRepository.js";

const create = async (c) => {
  const todo = await c.req.json();
  if (!todo.name) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const user = c.get("user");
  const created = await todoRepository.create(user.id, todo);
  return c.json(created, 201);
};

const readAll = async (c) => {
  const user = c.get("user");
  const todos = await todoRepository.findAll(user.id);
  return c.json(todos, 200);
};

const readOne = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const user = c.get("user");
  const todo = await todoRepository.findById(user.id, id);
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(todo, 200);
};

const update = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const todo = await c.req.json();
  if (!todo || !todo.name) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const user = c.get("user");
  const updated = await todoRepository.updateById(user.id, id, todo);
  if (!updated) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(updated, 200);
};

const deleteOne = async (c) => {
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const user = c.get("user");
  const deleted = await todoRepository.deleteById(user.id, id);
  if (!deleted) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(deleted, 200);
};

export { create, deleteOne, readAll, readOne, update };
