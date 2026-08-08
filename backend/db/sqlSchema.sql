CREATE TABLE users_shadow(user_id TEXT PRIMARY KEY,email TEXT NOT NULL);
CREATE TABLE habit_events(id SERIAL PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users_shadow(user_id),event_type TEXT NOT NULL,value NUMERIC DEFAULT 0,created_at TIMESTAMPTZ DEFAULT NOW());
-- JOIN: users_shadow u JOIN habit_events e ON u.user_id=e.user_id
