import app from "./app.js";

// Listen on 8000 inside the container
Deno.serve({ port: 8000 }, app.fetch);
