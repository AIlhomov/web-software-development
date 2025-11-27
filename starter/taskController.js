import * as taskRepository from "./taskRepository.js";

const create = async (c) => {
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const task = await c.req.json();
  if (!task?.description) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const created = await taskRepository.create(todoId, task);
  return c.json(created, 201);
};

const readAll = async (c) => {
  const todoId = Number(c.req.param("todoId"));
  if (!Number.isInteger(todoId)) {
    return c.json({ error: "Invalid todo id" }, 400);
  }

  const tasks = await taskRepository.findAll(todoId);
  return c.json(tasks, 200);
};

const readOne = async (c) => {
  const id = Number(c.req.param("taskId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid task id" }, 400);
  }

  const task = await taskRepository.findById(id);
  if (!task) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(task, 200);
};

const update = async (c) => {
  const id = Number(c.req.param("taskId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid task id" }, 400);
  }

  const task = await c.req.json();
  if (
    !task || !task.description ||
    typeof task.is_done !== "boolean"
  ) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const updated = await taskRepository.updateById(id, task);
  if (!updated) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(updated, 200);
};

const deleteOne = async (c) => {
  const id = Number(c.req.param("taskId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid task id" }, 400);
  }

  const deleted = await taskRepository.deleteById(id);
  if (!deleted) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(deleted, 200);
};

export { create, deleteOne, readAll, readOne, update };
