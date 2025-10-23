import * as jwt from "@hono/hono/jwt";
import { hash, verify } from "scrypt";
import * as authRepository from "./authRepository.js";

const JWT_SECRET = "jwt_secret";

const register = async (c) => {
    const user = await c.req.json();
    try {
        user.password_hash = hash(user.password);
        await authRepository.create(user);
    } catch (error) {
        // Ignore errors - still return success message
    }
    return c.json({ message: `Confirmation email sent to address ${user.email}.` });
};

//...

const login = async (c) => {
    const user = await c.req.json();

    const foundUser = await authRepository.findByEmail(user.email);
    if (!foundUser) {
        return c.json({ error: "Invalid email or password" }, 401);
    }

    const isValid = verify(user.password, foundUser.password_hash);
    if (!isValid) {
        return c.json({ error: "Invalid email or password" }, 401);
    }

    const payload = { email: foundUser.email, id: foundUser.id };
    const token = await jwt.sign(payload, JWT_SECRET);

    return c.json({
        message: "Login successful",
        user: { email: foundUser.email },
        token
    });
};

//...

export { login, register };