import * as commentRepository from "../repositories/commentRepository.js";
import * as voteRepository from "../repositories/voteRepository.js";

const parseId = (c, name) => {
    const n = Number(c.req.param(name));
    return Number.isInteger(n) ? n : undefined;
};

const readAll = async (c) => {
    const communityId = parseId(c, "communityId");
    const postId = parseId(c, "postId");
    if (communityId === undefined) return c.json({ error: "Invalid community id" }, 400);
    if (postId === undefined) return c.json({ error: "Invalid post id" }, 400);

    const rows = await commentRepository.readAll(communityId, postId);
    return c.json(rows, 200);
};

const create = async (c) => {
    const communityId = parseId(c, "communityId");
    const postId = parseId(c, "postId");
    if (communityId === undefined) return c.json({ error: "Invalid community id" }, 400);
    if (postId === undefined) return c.json({ error: "Invalid post id" }, 400);

    const body = await c.req.json().catch(() => ({}));
    const content = body?.content?.toString().trim();
    if (!content) return c.json({ error: "Missing required fields" }, 400);

    const user = c.get("user");
    const created = await commentRepository.create(communityId, postId, { content }, user.id);
    return c.json(created, 201);
};

const deleteOne = async (c) => {
    const communityId = parseId(c, "communityId");
    const postId = parseId(c, "postId");
    const commentId = parseId(c, "commentId");
    if (communityId === undefined) return c.json({ error: "Invalid community id" }, 400);
    if (postId === undefined) return c.json({ error: "Invalid post id" }, 400);
    if (commentId === undefined) return c.json({ error: "Invalid comment id" }, 400);

    const user = c.get("user");
    const deleted = await commentRepository.deleteOne(communityId, postId, commentId, user.id);
    if (!deleted) return c.json({ error: "Comment not found" }, 404);
    return c.json(deleted, 200);
};

const upvote = async (c) => {
    const communityId = parseId(c, "communityId");
    const postId = parseId(c, "postId");
    const commentId = parseId(c, "commentId");
    if (communityId === undefined) return c.json({ error: "Invalid community id" }, 400);
    if (postId === undefined) return c.json({ error: "Invalid post id" }, 400);
    if (commentId === undefined) return c.json({ error: "Invalid comment id" }, 400);

    const user = c.get("user");
    await voteRepository.upsertVote(user.id, commentId, "upvote");

    const comment = await commentRepository.getCommentWithVotes(commentId);
    if (!comment) return c.json({ error: "Comment not found" }, 404);
    return c.json(comment, 200);
};

const downvote = async (c) => {
    const communityId = parseId(c, "communityId");
    const postId = parseId(c, "postId");
    const commentId = parseId(c, "commentId");
    if (communityId === undefined) return c.json({ error: "Invalid community id" }, 400);
    if (postId === undefined) return c.json({ error: "Invalid post id" }, 400);
    if (commentId === undefined) return c.json({ error: "Invalid comment id" }, 400);

    const user = c.get("user");
    await voteRepository.upsertVote(user.id, commentId, "downvote");

    const comment = await commentRepository.getCommentWithVotes(commentId);
    if (!comment) return c.json({ error: "Comment not found" }, 404);
    return c.json(comment, 200);
};

export { readAll, create, deleteOne, upvote, downvote };
