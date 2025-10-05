FROM denoland/deno:alpine-2.4.3

WORKDIR /app

# Lock file is optional; include if you have it
COPY deno.json ./
# Warm cache (no-op if modules not cached yet)
RUN deno cache app-run.js || true

COPY . .

EXPOSE 8000
CMD ["run","--allow-env","--allow-net","app-run.js"]
