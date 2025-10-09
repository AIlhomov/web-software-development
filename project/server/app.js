import { Hono } from "@hono/hono";
import * as communityController from "./controllers/communityController.js";

const app = new Hono();

// Communities API
app.get("/api/communities", communityController.readAll);
app.get("/api/communities/:communityId", communityController.readOne);
app.post("/api/communities", communityController.create);
app.delete("/api/communities/:communityId", communityController.deleteOne);

export default app;
