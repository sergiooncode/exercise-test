#!/bin/bash
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

# postgres

until PGPASSWORD=password psql -h "$host" -U "postgres" -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER exercisestestdbuser WITH PASSWORD 'password';
    CREATE DATABASE exercisestestdb;
    GRANT ALL PRIVILEGES ON DATABASE exercisestestdb TO exercisestestdbuser;
EOSQL