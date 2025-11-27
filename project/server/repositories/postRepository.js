import postgres from "postgres";

const sql = postgres();

const readAll = async (communityId) => {
  const rows = await sql`
    SELECT 
      p.*,
      COUNT(v.vote) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(v.vote) FILTER (WHERE v.vote = 'downvote') AS downvotes
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    WHERE p.community_id = ${communityId} AND p.parent_post_id IS NULL
    GROUP BY p.id
    ORDER BY p.id`;

  // Convert vote counts from strings to integers
  return rows.map(post => ({
    ...post,
    upvotes: parseInt(post.upvotes) || 0,
    downvotes: parseInt(post.downvotes) || 0
  }));
};

const readOne = async (communityId, postId) => {
  const result = await sql`
    SELECT 
      p.*,
      COUNT(v.vote) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(v.vote) FILTER (WHERE v.vote = 'downvote') AS downvotes
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    WHERE p.community_id = ${communityId} AND p.id = ${postId}
    GROUP BY p.id`;

  if (result[0]) {
    return {
      ...result[0],
      upvotes: parseInt(result[0].upvotes) || 0,
      downvotes: parseInt(result[0].downvotes) || 0
    };
  }
  return result[0];
};

const create = async (communityId, post, userId) => {
  const result = await sql`
    INSERT INTO posts (community_id, title, content, created_by)
    VALUES (${communityId}, ${post.title ?? null}, ${post.content}, ${userId})
    RETURNING *`;
  const created = result[0];
  // New posts have 0 upvotes and 0 downvotes
  created.upvotes = 0;
  created.downvotes = 0;
  return created;
};

const deleteOne = async (communityId, postId, userId) => {
  const result = await sql`
    DELETE FROM posts
    WHERE community_id = ${communityId} AND id = ${postId} AND created_by = ${userId}
    RETURNING *`;
  return result[0];
};

const getPostWithVotes = async (postId) => {
  const result = await sql`
    SELECT 
      p.*,
      COUNT(v.vote) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(v.vote) FILTER (WHERE v.vote = 'downvote') AS downvotes
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    WHERE p.id = ${postId}
    GROUP BY p.id`;

  if (result[0]) {
    return {
      ...result[0],
      upvotes: parseInt(result[0].upvotes) || 0,
      downvotes: parseInt(result[0].downvotes) || 0
    };
  }
  return result[0];
};

const getRecentPosts = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const rows = await sql`
    SELECT 
      p.*,
      COUNT(DISTINCT v.user_id) FILTER (WHERE v.vote = 'upvote') AS upvotes,
      COUNT(DISTINCT v.user_id) FILTER (WHERE v.vote = 'downvote') AS downvotes,
      COUNT(DISTINCT c.id) AS comments
    FROM posts p
    LEFT JOIN votes v ON p.id = v.post_id
    LEFT JOIN posts c ON p.id = c.parent_post_id
    WHERE p.parent_post_id IS NULL
      AND p.created_at >= ${threeDaysAgo}
    GROUP BY p.id
    ORDER BY p.created_at DESC`;

  // Convert counts from strings to integers
  return rows.map(post => ({
    ...post,
    upvotes: parseInt(post.upvotes) || 0,
    downvotes: parseInt(post.downvotes) || 0,
    comments: parseInt(post.comments) || 0
  }));
};

export { readAll, readOne, create, deleteOne, getPostWithVotes, getRecentPosts };
