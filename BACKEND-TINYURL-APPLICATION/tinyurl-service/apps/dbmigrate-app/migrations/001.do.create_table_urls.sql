CREATE TABLE IF NOT EXISTS tableurls
(
    short_url text NOT NULL,
    long_url text NOT NULL,
    expiry_date date NOT NULL,
    created_at date NOT NULL
)