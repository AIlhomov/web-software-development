import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

const app = new Hono();
app.use("/*", cors());

app.get("/", (c) => c.json({ message: "Hello World!" }));

export default app;