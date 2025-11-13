import postgres from "postgres";

const sql = postgres();



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
