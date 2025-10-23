import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as authController from "./authController.js";
import * as middlewares from "./middlewares.js";
//KEEP
import * as readingProgressController from "./readingProgressController.js";
// ...

const app = new Hono();

app.use("/*", cors());
//THE TESTS DIDNT LIKE THAT I HAD OTHER LECTURE MATERIALS HERE WHAT IS THIS!
//SECURITY
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.use("/api/secret", middlewares.authenticate);
app.get("/api/secret", (c) => {
    return c.json({ message: "This is a secret message!" });
});

// ...
// middleware and new routes
app.use("/api/reading-progress/*", middlewares.authenticate);
app.get("/api/reading-progress", readingProgressController.getUserProgress);
app.get("/api/reading-progress/book/:bookId", readingProgressController.getUserProgressForBook);
app.post("/api/reading-progress/book/:bookId", readingProgressController.createOrUpdateProgress);
app.delete("/api/reading-progress/book/:bookId", readingProgressController.deleteProgress);

// ...

export default app;