import postgres from "postgres";

const sql = postgres();

const getStats = async () => {
    const todoCountResult = await sql`
        SELECT COUNT(*) as count FROM todos
    `;

    const taskCountResult = await sql`
        SELECT COUNT(*) as count FROM todo_tasks
    `;

    return {
        todos: Number(todoCountResult[0].count),
        tasks: Number(taskCountResult[0].count)
    };
};

export { getStats };
