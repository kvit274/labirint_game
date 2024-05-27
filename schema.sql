
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id TEXT NOT NULL PRIMARY KEY,
    password TEXT NOT NULL

    
);

DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard
(
    user_id TEXT NOT NULL PRIMARY KEY,
    score text NOT NULL
);

SELECT * FROM leaderboard
ORDER BY score DESC;

-- INSERT INTO users (user_id, password)
-- VALUES ('kvit', 'pbkdf2:sha256:260000$gQoX2DI4fmiHnTXq$6ff5607ff432e3afc019a27fcdccfd3efc6b3e466485c13b809be8b43a931c65');
