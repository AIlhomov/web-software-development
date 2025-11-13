import * as postRepository from "../repositories/postRepository.js";

const parseIntOrBad = (val) => {
    const n = Number(val);
    return Number.isInteger(n) ? n : null;
};

const readAll = async (c) => {
    const communityId = parseIntOrBad(c.req.param("communityId"));
    if (communityId === null) {
        return c.json({ error: "Invalid community id" }, 400);
    }
    const posts = await postRepository.readAll(communityId);
    return c.json(posts, 200);
};

const readOne = async (c) => {
    const communityId = parseIntOrBad(c.req.param("communityId"));
    const postId = parseIntOrBad(c.req.param("postId"));
    if (communityId === null) return c.json({ error: "Invalid community id" }, 400);
    if (postId === null) return c.json({ error: "Invalid post id" }, 400);

    const post = await postRepository.readOne(communityId, postId);
    if (!post) return c.json({ error: "Post not found" }, 404);
    return c.json(post, 200);
};

const create = async (c) => {
    const communityId = parseIntOrBad(c.req.param("communityId"));
    if (communityId === null) return c.json({ error: "Invalid community id" }, 400);

    const body = await c.req.json().catch(() => ({}));
    const content = body?.content?.toString() ?? "";
    const title = body?.title ?? null;

    if (!content.trim()) {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const user = c.get("user");
    const created = await postRepository.create(communityId, { title, content }, user.id);
    return c.json(created, 201);
};

const deleteOne = async (c) => {
    const communityId = parseIntOrBad(c.req.param("communityId"));
    const postId = parseIntOrBad(c.req.param("postId"));
    if (communityId === null) return c.json({ error: "Invalid community id" }, 400);
    if (postId === null) return c.json({ error: "Invalid post id" }, 400);

    const user = c.get("user");
    const deleted = await postRepository.deleteOne(communityId, postId, user.id);
    if (!deleted) return c.json({ error: "Post not found" }, 404);
    return c.json(deleted, 200);
};

export { readAll, readOne, create, deleteOne };
