CREATE TABLE IF NOT EXISTS copy_job (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    src_path TEXT NOT NULL,
    dst_path TEXT NOT NULL,
    mode INTEGER NOT NULL CHECK (mode IN (0, 1))
);