import postgres from "postgres";

const sql = postgres();

/**
 * List all comments for a given (communityId, postId)
 * A comment is a row in posts with parent_post_id = postId
 */
const readAll = async (communityId, postId) => {
    return await sql`
    SELECT *
    FROM posts
    WHERE community_id = ${communityId}
      AND parent_post_id = ${postId}
    ORDER BY id;
  `;
};

/**
 * Create a new comment (title is null, content required)
 */
const create = async (communityId, postId, comment) => {
    const result = await sql`
    INSERT INTO posts (community_id, title, content, parent_post_id)
    VALUES (${communityId}, ${null}, ${comment.content}, ${postId})
    RETURNING *;
  `;
    return result[0];
};

/**
 * Delete a comment by ids and return the deleted row (or undefined)
 */
const deleteOne = async (communityId, postId, commentId) => {
    const result = await sql`
    DELETE FROM posts
    WHERE id = ${commentId}
      AND community_id = ${communityId}
      AND parent_post_id = ${postId}
    RETURNING *;
  `;
    return result[0];
};

export { readAll, create, deleteOne };
