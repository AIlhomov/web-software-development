import * as jwt from "@hono/hono/jwt";
import * as authRepository from "./authRepository.js";

const JWT_SECRET = "jwt_secret";

const authenticate = async (c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Missing or invalid authorization header" }, 401);
    }

    // Drop the "Bearer " prefix to get the token
    const token = authHeader.substring(7);

    try {
        const payload = await jwt.verify(token, JWT_SECRET);
        c.set("user", payload);
        await next();
    } catch (error) {
        return c.json({ error: "Invalid or expired token" }, 401);
    }
};

const requireAdmin = async (c, next) => {
    const user = c.get("user");

    if (!user || !user.id) {
        return c.json({ error: "Insufficient permissions" }, 403);
    }

    const roles = await authRepository.getUserRoles(user.id);

    if (!roles.includes("ADMIN")) {
        return c.json({ error: "Insufficient permissions" }, 403);
    }

    await next();
};

export { authenticate, requireAdmin };
