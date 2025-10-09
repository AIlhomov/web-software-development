CREATE TABLE posts (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  community_id INTEGER NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--docker compose up -d database-migrations
--docker compose logs -f database-migrations
