import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as bookRepository from "./bookRepository.js";

const app = new Hono();
app.use("/*", cors());

app.post("/api/books", async (c) => {
    const book = await c.req.json();
    if (!book.title ||
        !book.description ||
        !book.published_at ||
        !book.page_count) {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const newBook = await bookRepository.create(book);
    return c.json(newBook, 201);
});

app.get("/api/books", async (c) => {
    const books = await bookRepository.readAll();
    return c.json(books);
});

app.get("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid book id" }, 400);
    }

    const book = await bookRepository.readOne(id);

    if (!book) {
        return c.json({ error: "Book not found" }, 404);
    }

    return c.json(book);
});

app.put("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid book id" }, 400);
    }

    const book = await c.req.json();
    if (!book.title ||
        !book.description ||
        !book.published_at ||
        !book.page_count) {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const updatedBook = await bookRepository.update(id, book);

    if (!updatedBook) {
        return c.json({ error: "Book not found" }, 404);
    }

    return c.json(updatedBook);
});

app.delete("/api/books/:bookId", async (c) => {
    const id = Number(c.req.param("bookId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid book id" }, 400);
    }

    const deletedBook = await bookRepository.deleteOne(id);

    if (!deletedBook) {
        return c.json({ error: "Book not found" }, 404);
    }

    return c.json(deletedBook);
});

export default app;