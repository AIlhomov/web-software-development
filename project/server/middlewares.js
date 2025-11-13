import * as jwt from "@hono/hono/jwt";

const JWT_SECRET = "jwt_secret";

export const authenticate = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    
    if (!authHeader) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    try {
        const payload = await jwt.verify(token, JWT_SECRET);
        c.set("user", payload);
        await next();
    } catch (error) {
        return c.json({ error: "Unauthorized" }, 401);
    }
};
