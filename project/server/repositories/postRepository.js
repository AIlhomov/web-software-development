import postgres from "postgres";

const sql = postgres();

const readAll = async (communityId) => {
    return await sql`
    SELECT * FROM posts
    WHERE community_id = ${communityId}
    ORDER BY id`;
};

const readOne = async (communityId, postId) => {
    const result = await sql`
    SELECT * FROM posts
    WHERE community_id = ${communityId} AND id = ${postId}`;
    return result[0];
};

const create = async (communityId, post) => {
    const result = await sql`
    INSERT INTO posts (community_id, title, content)
    VALUES (${communityId}, ${post.title ?? null}, ${post.content})
    RETURNING *`;
    return result[0];
};

const deleteOne = async (communityId, postId) => {
    const result = await sql`
    DELETE FROM posts
    WHERE community_id = ${communityId} AND id = ${postId}
    RETURNING *`;
    return result[0];
};

export { readAll, readOne, create, deleteOne };
