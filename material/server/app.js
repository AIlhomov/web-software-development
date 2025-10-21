import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as authController from "./authController.js";

const app = new Hono();

app.use("/*", cors());
//THE TESTS DIDNT LIKE THAT I HAD OTHER LECTURE MATERIALS HERE WHAT IS THIS!
//SECURITY
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

export default app;