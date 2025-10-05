import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

// Build a postgres client from env (Docker passes env via env_file)
const sql = postgres({
    host: Deno.env.get("PGHOST") || "localhost",
    port: Number(Deno.env.get("PGPORT") ?? 5432),
    database: Deno.env.get("PGDATABASE") || "postgres",
    username: Deno.env.get("PGUSER") || "postgres",
    password: Deno.env.get("PGPASSWORD") || "",
});

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

// Health
app.get("/health", (c) => c.json({ ok: true }));

// Simple DB check
app.get("/api/dbcheck", async (c) => {
    const rows = await sql`SELECT 1 AS ok`;
    return c.json(rows[0]);
});

// Optional endpoint: list communities (from DB)
app.get("/api/communities", async (c) => {
    const rows = await sql`SELECT id, name FROM communities ORDER BY id`;
    return c.json(rows);
});

export default app;
