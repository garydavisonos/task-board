#!/bin/sh

echo "Waiting for database to be ready, let's be patient..."

# Wait for MySQL to be ready
until nc -z db 3306; do
  echo "Database not ready yet, waiting..."
  sleep 2
done

echo "Running database migrations..."
npx knex migrate:latest

echo "Add some placholder data..."
npx knex seed:run

echo "Starting application..."
npm run dev