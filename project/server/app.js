import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

import * as communityController from "./controllers/communityController.js";
import * as postController from "./controllers/postController.js";
import * as commentController from "./controllers/commentController.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());


// communities
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", communityController.create);
app.delete("/api/communities/:communityId", communityController.deleteOne);

// posts (per community)
app.get("/api/communities/:communityId/posts", postController.readAll);
app.get("/api/communities/:communityId/posts/:postId", postController.readOne);
app.post("/api/communities/:communityId/posts", postController.create);
app.delete("/api/communities/:communityId/posts/:postId", postController.deleteOne);

// NEW comment routes…
app.get(
    "/api/communities/:communityId/posts/:postId/comments",
    commentController.readAll,
);
app.post(
    "/api/communities/:communityId/posts/:postId/comments",
    commentController.create,
);
app.delete(
    "/api/communities/:communityId/posts/:postId/comments/:commentId",
    commentController.deleteOne,
);

export default app;

//docker compose up -d --build server && docker compose logs -f server
