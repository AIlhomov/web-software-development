import postgres from "postgres";

const sql = postgres();

/**
 * Create or update a vote for a post/comment
 * If user already voted on this post, remove old vote first
 */
const upsertVote = async (userId, postId, voteType) => {
  // First, delete any existing vote by this user on this post
  await sql`
    DELETE FROM votes
    WHERE user_id = ${userId} AND post_id = ${postId}
  `;

  // Then insert the new vote
  const result = await sql`
    INSERT INTO votes (user_id, post_id, vote)
    VALUES (${userId}, ${postId}, ${voteType})
    RETURNING *
  `;
  return result[0];
};

/**
 * Get vote counts for a post/comment
 */
const getVoteCounts = async (postId) => {
  const result = await sql`
    SELECT
      COUNT(*) FILTER (WHERE vote = 'upvote') AS upvotes,
      COUNT(*) FILTER (WHERE vote = 'downvote') AS downvotes
    FROM votes
    WHERE post_id = ${postId}
  `;
  return {
    upvotes: parseInt(result[0].upvotes) || 0,
    downvotes: parseInt(result[0].downvotes) || 0
  };
};

export { upsertVote, getVoteCounts };
