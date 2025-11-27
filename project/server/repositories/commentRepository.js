import postgres from "postgres";

const sql = postgres();


/**
 * List all comments for a given (communityId, postId)
 * A comment is a row in posts with parent_post_id = postId
 */
const readAll = async (communityId, postId) => {
  const rows = await sql`
    SELECT 
      p.*,
      COUNT(v.vote) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(v.vote) FILTER (WHERE v.vote = 'downvote') AS downvotes
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    WHERE p.community_id = ${communityId}
      AND p.parent_post_id = ${postId}
    GROUP BY p.id
    ORDER BY p.id;
  `;

  // Convert vote counts from strings to integers
  return rows.map(comment => ({
    ...comment,
    upvotes: parseInt(comment.upvotes) || 0,
    downvotes: parseInt(comment.downvotes) || 0
  }));
};

/**
 * Create a new comment (title is null, content required)
 */
const create = async (communityId, postId, comment, userId) => {
  const result = await sql`
    INSERT INTO posts (community_id, title, content, parent_post_id, created_by)
    VALUES (${communityId}, ${null}, ${comment.content}, ${postId}, ${userId})
    RETURNING *;
  `;
  const created = result[0];
  // New comments have 0 upvotes and 0 downvotes
  created.upvotes = 0;
  created.downvotes = 0;
  return created;
};

/**
 * Delete a comment by ids and return the deleted row (or undefined)
 */
const deleteOne = async (communityId, postId, commentId, userId) => {
  const result = await sql`
    DELETE FROM posts
    WHERE id = ${commentId}
      AND community_id = ${communityId}
      AND parent_post_id = ${postId}
      AND created_by = ${userId}
    RETURNING *;
  `;
  return result[0];
};

/**
 * Get a comment with vote counts
 */
const getCommentWithVotes = async (commentId) => {
  const result = await sql`
    SELECT 
      p.*,
      COUNT(v.vote) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(v.vote) FILTER (WHERE v.vote = 'downvote') AS downvotes
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    WHERE p.id = ${commentId}
    GROUP BY p.id;
  `;

  if (result[0]) {
    return {
      ...result[0],
      upvotes: parseInt(result[0].upvotes) || 0,
      downvotes: parseInt(result[0].downvotes) || 0
    };
  }
  return result[0];
};

export { readAll, create, deleteOne, getCommentWithVotes };
