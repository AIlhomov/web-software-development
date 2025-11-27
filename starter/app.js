import { Hono } from "@hono/hono";
import * as authController from "./authController.js";
import * as taskController from "./taskController.js";
import * as todoController from "./todoController.js";
import * as middlewares from "./middlewares.js";

const app = new Hono();

app.post("/api/auth/login", authController.login);
app.post("/api/auth/register", authController.register);

app.use("/api/todos/*", middlewares.authenticate);

app.post("/api/todos", todoController.create);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);

app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);

export default app;
