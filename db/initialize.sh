#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DATABASE" <<-EOSQL
    CREATE USER admin;
    CREATE DATABASE nestapp ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE nestapp TO admin;
    ALTER USER admin WITH PASSWORD 'admin';
    ALTER USER admin WITH SUPERUSER;
EOSQL
