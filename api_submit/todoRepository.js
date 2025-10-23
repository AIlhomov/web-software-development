import postgres from "postgres";

const sql = postgres();

const create = async (userId, todo) => {
  const rows = await sql`
    INSERT INTO todos (name, created_at, user_id)
    VALUES (${todo.name}, NOW(), ${userId})
    RETURNING *
  `;
  return rows[0];
};

const deleteById = async (userId, id) => {
  const rows = await sql`
    DELETE FROM todos
    WHERE id = ${Number(id)} AND user_id = ${userId}
    RETURNING *
  `;
  return rows[0];
};

const findAll = async (userId) => {
  return await sql`
    SELECT * FROM todos
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
};

const findById = async (userId, id) => {
  const rows = await sql`
    SELECT * FROM todos
    WHERE id = ${Number(id)} AND user_id = ${userId}
    LIMIT 1
  `;
  return rows[0];
};

const updateById = async (userId, id, todo) => {
  const rows = await sql`
    UPDATE todos
    SET name = ${todo.name},
        created_at = ${todo.created_at}
    WHERE id = ${Number(id)} AND user_id = ${userId}
    RETURNING *
  `;
  return rows[0];
};

export { create, deleteById, findAll, findById, updateById };
