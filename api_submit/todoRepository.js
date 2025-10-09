import postgres from "postgres";

const sql = postgres();

const create = async (todo) => {
    const rows = await sql`
    INSERT INTO todos (name, created_at)
    VALUES (${todo.name}, NOW())
    RETURNING *
  `;
    return rows[0];
};

const deleteById = async (id) => {
    const rows = await sql`
    DELETE FROM todos
    WHERE id = ${Number(id)}
    RETURNING *
  `;
    return rows[0];
};

const findAll = async () => {
    return await sql`
    SELECT * FROM todos
    ORDER BY id
  `;
};

const findById = async (id) => {
    const rows = await sql`
    SELECT * FROM todos
    WHERE id = ${Number(id)}
    LIMIT 1
  `;
    return rows[0];
};

const updateById = async (id, todo) => {
    const rows = await sql`
    UPDATE todos
    SET name = ${todo.name},
        created_at = ${todo.created_at}
    WHERE id = ${Number(id)}
    RETURNING *
  `;
    return rows[0];
};

export { create, deleteById, findAll, findById, updateById };
