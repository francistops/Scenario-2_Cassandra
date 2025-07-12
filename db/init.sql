-- Créer une base de données
CREATE DATABASE andre;

-- Connecter à une base données
-- USE andre;
\c andre;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "passHash" CHAR(64) NOT NULL,
    "firstName" VARCHAR(255) NULL,
    "lastName" VARCHAR(255) NULL
);

CREATE UNIQUE INDEX uidx_users_email ON "users"("email");

CREATE TABLE "tokens" (
    "id" SERIAL PRIMARY KEY,
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
);

CREATE UNIQUE INDEX uidx_tokens_token ON "tokens"("token");

INSERT INTO "users" ("email", "passHash", "firstName", "lastName") VALUES
(
    'andre.jacques@cegepsherbooke.qc.ca', 
    ENCODE(
        DIGEST('MonGrainDeSel'::text || ENCODE(DIGEST('Xxpassw0rdxX'::bytea, 'sha256'::text), 'hex'), 'sha256'),
        'hex'
    ), 
    'André', 
    'Jacques'
),
(
    'olivier.scheffler@cegepsherbooke.qc.ca', 
    ENCODE(
        DIGEST('MonGrainDeSel'::text || ENCODE(DIGEST('Xxpassw1rdxX'::bytea, 'sha256'::text), 'hex'), 'sha256'),
        'hex'
    ), 
    'Olivier', 
    'Scheffler'
),
(
    'pier-luc.breault@cegepsherbooke.qc.ca', 
    ENCODE(
        DIGEST('MonGrainDeSel'::text || ENCODE(DIGEST('Xxpassw3rdxX'::bytea, 'sha256'::text), 'hex'), 'sha256'),
        'hex'
    ), 
    'Pier-Luc', 
    'Breault'
);
