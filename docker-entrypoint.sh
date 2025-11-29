#!/bin/sh

echo "Waiting for MySQL to be ready..."

# Alpine uses netcat, but ensure arguments work for the specific nc version
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
  echo "Still waiting..."
done

echo "MySQL is ready!"

echo "Running Sequelize migrations..."
npx sequelize-cli db:migrate

echo "Starting Node.js server..."
npm start