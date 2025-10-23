import { Hono } from "@hono/hono";
import * as todoController from "./todoController.js";
import * as taskController from "./taskController.js";
import * as authController from "./authController.js";
import * as middlewares from "./middlewares.js";

const app = new Hono();

// Authentication routes
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// Protected todo routes
app.use("/api/todos/*", middlewares.authenticate);
app.post("/api/todos", todoController.create);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);

// Protected task routes
app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);

export default app;
