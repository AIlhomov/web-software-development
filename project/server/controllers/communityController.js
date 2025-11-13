import * as repo from "../repositories/communityRepository.js";

const isInt = (n) => Number.isInteger(n);

export const readAll = async (c) => {
    const items = await repo.findAll();
    return c.json(items, 200);
};

export const readOne = async (c) => {
    const id = Number(c.req.param("communityId"));
    if (!isInt(id)) return c.json({ error: "Invalid id" }, 400);

    const item = await repo.findById(id);
    if (!item) return c.json({ error: "Community not found" }, 404);

    return c.json(item, 200);
};

export const create = async (c) => {
    let body;
    try {
        body = await c.req.json();
    } catch {
        return c.json({ error: "Missing required fields" }, 400);
    }

    const name = body?.name?.toString().trim();
    const description = body?.description?.toString() ?? null;

    if (!name) return c.json({ error: "Missing required fields" }, 400);

    const user = c.get("user");
    const created = await repo.create({ name, description, userId: user.id });
    return c.json(created, 201);
};

export const deleteOne = async (c) => {
    const id = Number(c.req.param("communityId"));
    if (!isInt(id)) return c.json({ error: "Invalid id" }, 400);

    const user = c.get("user");
    const deleted = await repo.deleteById(id, user.id);
    if (!deleted) return c.json({ error: "Community not found" }, 404);

    return c.json(deleted, 200);
};
