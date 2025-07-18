# Task Board

A containerised task management application built with Next.js, TypeScript, and MySQL.

## Features

- Create, edit, and delete lists
- Add, edit, and remove cards from lists
- Move cards between lists
- Mark cards as complete
- Email notifications for completed tasks
- Persistent data storage with MySQL database

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MySQL 8
- **Database Management**: phpMyAdmin
- **Query Builder**: Knex.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Containerisation**: Docker & Docker Compose
- **Linting**: ESLint, Prettier
- **Node Version**: 18 (specified in `.nvmrc`)

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js 18 (if running locally without Docker)

## Installation & Setup

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/garydavisonos/task-board.git
   ```

2. Navigate into the project folder:
   ```bash
   cd task-board
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the application with Docker Compose:
   ```bash
   docker compose up --build
   ```

This will start:
- **Next.js app** on http://localhost:3000
- **MySQL database** on port 8806
- **phpMyAdmin** on http://localhost:8180

The database migrations will run automatically when the containers start.

### Local Development (Without Docker)

1. Follow steps 1-3 above
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env.local` to point to your local MySQL instance
4. Run migrations:
   ```bash
   npx knex migrate:latest
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Management

- **phpMyAdmin**: Access the database interface at http://localhost:8180
  - Server: `db`
  - Username: `root`
  - Password: `password`

- **Direct MySQL access**:
  ```bash
  docker exec -it <db-container-name> mysql -u root -p
  ```

## Database Operations

- **Run migrations**:
  ```bash
  npx knex migrate:latest
  ```

- **Rollback migrations**:
  ```bash
  npx knex migrate:rollback
  ```

- **Seed database**:
  ```bash
  npx knex seed:run
  ```

## API Endpoints

The application provides RESTful API endpoints:

- **Lists**: `/api/lists` (GET, POST), `/api/lists/[id]` (GET, PUT, DELETE)
- **Cards**: `/api/cards` (GET, POST), `/api/cards/[id]` (GET, PUT, DELETE)
- **Task Completion**: `/api/complete-task` (POST)
- **Check Tasks**: `/api/check-tasks` (GET) - Placeholder data


## Development

### Tests

To run written tests:
```bash
npm run test
```

### Linting

To check your code for linting errors:
```bash
npm run lint
```

### Building for Production

To build the app for production:
```bash
npm run build
```

Then start the production server:
```bash
npm start
```

## Docker Services

- **app**: Next.js application container
- **db**: MySQL 8 database container
- **phpmyadmin**: Database management interface

## Environment Variables

Key environment variables in `.env.local`:

```env
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydb
```