import { Hono } from "@hono/hono";
import { helloService } from "./services/helloService.js";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello World!" }));

app.get("/hello", (c) => c.json({ message: helloService.getHello() }));

app.post("/", async (c) => {
    const body = await c.req.json();

    if (body.data === "Oops!") {
        body.message = "Hello Oops!";
    } else {
        body.message = "Hello World!";
    }

    return c.json(body);
});

export default app;