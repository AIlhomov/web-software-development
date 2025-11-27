import * as jwt from "@hono/hono/jwt";
import { hash, verify } from "scrypt";
import * as authRepository from "./authRepository.js";

const JWT_SECRET = "jwt_secret";

const register = async (c) => {
  const user = await c.req.json();

  const existingUser = await authRepository.findByEmail(user.email);
  if (!existingUser) {
    user.password_hash = hash(user.password);
    await authRepository.create(user);
  }

  return c.json({
    message: `Confirmation email sent to address ${user.email}.`,
  });
};

const login = async (c) => {
  const loggingUser = await c.req.json();

  const foundUser = await authRepository.findByEmail(loggingUser.email);
  if (!foundUser) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const isValid = verify(loggingUser.password, foundUser.password_hash);
  if (!isValid) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const user = { email: foundUser.email, id: foundUser.id };
  const token = await jwt.sign(user, JWT_SECRET);

  return c.json({
    message: `Welcome back ${foundUser.email}!`,
    user,
    token,
  });
};

export { login, register };
