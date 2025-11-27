import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";
import * as authController from "./controllers/authController.js";
import { authenticate } from "./middlewares.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

// auth
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// communities
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", authenticate, communityController.create);
app.delete("/api/communities/:communityId", authenticate, communityController.deleteOne);

// posts (per community)
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readOne);
app.post("/api/communities/:communityId/posts", authenticate, postController.create);
app.delete("/api/communities/:communityId/posts/:postId", authenticate, postController.deleteOne);

// post voting
app.post("/api/communities/:communityId/posts/:postId/upvote", authenticate, postController.upvote);
app.post("/api/communities/:communityId/posts/:postId/downvote", authenticate, postController.downvote);

// NEW comment routes…
app.get(
    "/api/communities/:communityId/posts/:postId/comments",
    commentController.readAll,
);
app.post(
    "/api/communities/:communityId/posts/:postId/comments",
    authenticate,
    commentController.create,
);
app.delete(
    "/api/communities/:communityId/posts/:postId/comments/:commentId",
    authenticate,
    commentController.deleteOne,
);

// comment voting
app.post(
    "/api/communities/:communityId/posts/:postId/comments/:commentId/upvote",
    authenticate,
    commentController.upvote,
);
app.post(
    "/api/communities/:communityId/posts/:postId/comments/:commentId/downvote",
    authenticate,
    commentController.downvote,
);

export default app;

//docker compose up -d --build server && docker compose logs -f server
