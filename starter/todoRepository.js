import postgres from "postgres";

const sql = postgres();

const create = async (userId, todo) => {
  const rows = await sql`
    INSERT INTO todos (name, user_id, created_at)
      VALUES (${todo.name}, ${userId}, NOW())
      RETURNING *
  `;
  return rows[0];
};

const deleteById = async (userId, todoId) => {
  const rows = await sql`
    DELETE FROM todos
      WHERE id = ${todoId} AND user_id = ${userId}
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

const findById = async (userId, todoId) => {
  const rows = await sql`
    SELECT * FROM todos
      WHERE id = ${todoId} AND user_id = ${userId}
  `;
  return rows[0];
};

const updateById = async (userId, todoId, todo) => {
  const rows = await sql`
    UPDATE todos
      SET name = ${todo.name}
      WHERE id = ${todoId} AND user_id = ${userId}
      RETURNING *
  `;
  return rows[0];
};

export { create, deleteById, findAll, findById, updateById };
