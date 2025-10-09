import postgres from "postgres";

const sql = postgres({
    host: Deno.env.get("PGHOST"),
    port: Number(Deno.env.get("PGPORT") ?? 5432),
    database: Deno.env.get("PGDATABASE"),
    username: Deno.env.get("PGUSER"),
    password: Deno.env.get("PGPASSWORD"),
});

const findAll = async () => {
    return await sql/* sql */`
    SELECT id, name, description, created_at
    FROM communities
    ORDER BY id
  `;
};

const findById = async (id) => {
    const rows = await sql/* sql */`
    SELECT id, name, description, created_at
    FROM communities
    WHERE id = ${Number(id)}
    LIMIT 1
  `;
    return rows[0];
};

const create = async ({ name, description }) => {
    const rows = await sql/* sql */`
    INSERT INTO communities (name, description)
    VALUES (${name}, ${description ?? null})
    RETURNING id, name, description, created_at
  `;
    return rows[0];
};

const deleteById = async (id) => {
    const rows = await sql/* sql */`
    DELETE FROM communities
    WHERE id = ${Number(id)}
    RETURNING id, name, description, created_at
  `;
    return rows[0];
};

export { findAll, findById, create, deleteById };
