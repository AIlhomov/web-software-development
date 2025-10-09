import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as bookController from "./bookController.js";
import * as chapterController from "./chapterController.js";

const app = new Hono();

app.use("/*", cors());

app.post("/api/books", bookController.create);
app.get("/api/books", bookController.readAll);
app.get("/api/books/:bookId", bookController.readOne);
app.put("/api/books/:bookId", bookController.update);
app.delete("/api/books/:bookId", bookController.deleteOne);

app.post("/api/books/:bookId/chapters", chapterController.create);
app.get("/api/books/:bookId/chapters", chapterController.readAll);
app.get("/api/books/:bookId/chapters/:chapterId", chapterController.readOne);
app.put("/api/books/:bookId/chapters/:chapterId", chapterController.update);
app.delete("/api/books/:bookId/chapters/:chapterId", chapterController.deleteOne);

export default app;