import postgres from "postgres";

const sql = postgres();

const create = async (todoId, task) => {
    const rows = await sql`
    INSERT INTO todo_tasks (todo_id, description)
    VALUES (${Number(todoId)}, ${task.description})
    RETURNING *
  `;
    return rows[0];
};

const deleteById = async (id) => {
    const rows = await sql`
    DELETE FROM todo_tasks
    WHERE id = ${Number(id)}
    RETURNING *
  `;
    return rows[0];
};

const findAll = async (todoId) => {
    return await sql`
    SELECT *
    FROM todo_tasks
    WHERE todo_id = ${Number(todoId)}
    ORDER BY id
  `;
};

const findById = async (id) => {
    const rows = await sql`
    SELECT *
    FROM todo_tasks
    WHERE id = ${Number(id)}
    LIMIT 1
  `;
    return rows[0];
};

const updateById = async (id, task) => {
    const rows = await sql`
    UPDATE todo_tasks
    SET description = ${task.description},
        is_done = ${task.is_done}
    WHERE id = ${Number(id)}
    RETURNING *
  `;
    return rows[0];
};

export { create, deleteById, findAll, findById, updateById };
