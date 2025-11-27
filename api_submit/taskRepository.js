import postgres from "postgres";

const sql = postgres();

const create = async (userId, todoId, task) => {
    // First verify that the todo belongs to the user
    const userTodoCount = await sql`
    SELECT COUNT(*) AS count
    FROM todos
    WHERE id = ${Number(todoId)} AND user_id = ${userId}
  `;

    if (userTodoCount[0]?.count === "0") {
        return null;
    }

    const rows = await sql`
    INSERT INTO todo_tasks (todo_id, description)
    VALUES (${Number(todoId)}, ${task.description})
    RETURNING *
  `;
    return rows[0];
};

const deleteById = async (userId, id) => {
    // Verify the task belongs to a todo owned by the user
    const userTodoTaskCount = await sql`
    SELECT COUNT(*) AS count
    FROM todo_tasks
    JOIN todos ON todo_tasks.todo_id = todos.id
    WHERE todo_tasks.id = ${Number(id)} AND todos.user_id = ${userId}
  `;

    if (userTodoTaskCount[0]?.count === "0") {
        return null;
    }

    const rows = await sql`
    DELETE FROM todo_tasks
    WHERE id = ${Number(id)}
    RETURNING *
  `;
    return rows[0];
};

const findAll = async (userId, todoId) => {
    // First verify that the todo belongs to the user
    const userTodoCount = await sql`
    SELECT COUNT(*) AS count
    FROM todos
    WHERE id = ${Number(todoId)} AND user_id = ${userId}
  `;

    if (userTodoCount[0]?.count === "0") {
        return null;
    }

    return await sql`
    SELECT *
    FROM todo_tasks
    WHERE todo_id = ${Number(todoId)}
    ORDER BY id
  `;
};

const findById = async (userId, id) => {
    // Use JOIN to verify the task belongs to a todo owned by the user
    const rows = await sql`
    SELECT todo_tasks.*
    FROM todo_tasks
    JOIN todos ON todo_tasks.todo_id = todos.id
    WHERE todo_tasks.id = ${Number(id)} AND todos.user_id = ${userId}
    LIMIT 1
  `;
    return rows[0] || null;
};

const updateById = async (userId, id, task) => {
    // Verify the task belongs to a todo owned by the user
    const userTodoTaskCount = await sql`
    SELECT COUNT(*) AS count
    FROM todo_tasks
    JOIN todos ON todo_tasks.todo_id = todos.id
    WHERE todo_tasks.id = ${Number(id)} AND todos.user_id = ${userId}
  `;

    if (userTodoTaskCount[0]?.count === "0") {
        return null;
    }

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
