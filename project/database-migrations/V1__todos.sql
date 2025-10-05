CREATE TABLE IF NOT EXISTS communities (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Sample seed data
INSERT INTO communities (name) VALUES
  ('Otaniemi Residents'),
  ('ESN Aalto')
ON CONFLICT DO NOTHING;
