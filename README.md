# Node Task Manager

A task manager REST API built with Node.js native HTTP APIs, TypeScript, JSON-file persistence, and automated tests.

This project was created as a backend fundamentals challenge. Instead of using Express, Fastify, or another web framework, the API implements its own HTTP server flow, route matching, request parsing, response formatting, validation, and persistence layer. That makes the project useful for showing knowledge of what web frameworks usually abstract away.

## Stack

- **Node.js** with the native `http` module
- **TypeScript** with strict compiler options
- **Vitest** for unit tests
- **Supertest** for HTTP controller tests
- **Biome** for formatting, linting, and import organization
- **csv-parse** for reading CSV files
- **Node filesystem APIs** for JSON-file persistence

## What This Project Demonstrates

- Building an HTTP API without a framework, using Node's native request and response objects.
- Designing REST endpoints for a task lifecycle: create, list, search, update, delete, and complete.
- Creating a custom route matcher that supports dynamic route params like `/tasks/:id`.
- Parsing query strings into request data through a small middleware abstraction.
- Handling JSON and multipart request bodies manually.
- Keeping response formatting centralized with a reusable JSON response helper.
- Modeling application errors with custom `ValidationError` and `ResourceNotFoundError` classes.
- Separating HTTP controllers from the task storage model.
- Injecting the `Task` store into the app factory, which makes the API easier to test.
- Testing business logic with unit tests and HTTP behavior with Supertest.
- Automating task creation from CSV input through a standalone import script.

## Main Features

- Create tasks with title and description.
- List all tasks.
- Search tasks by `title` or `description`.
- Update task data by ID.
- Delete tasks by ID.
- Mark tasks as completed.
- Import tasks from a CSV file through a script that reads each row and sends requests to the API.
- Persist task data in a local `tasks.json` file.

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks` | List all tasks |
| `GET` | `/tasks?title=term` | Search tasks by title |
| `GET` | `/tasks?description=term` | Search tasks by description |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `PATCH` | `/tasks/:id/complete` | Complete a task |
| `POST` | `/tasks/batch-csv-import` | Receive a CSV upload request |

## Project Structure

```text
src/
  app.ts                         # Native HTTP app factory and request pipeline
  server.ts                      # Server bootstrap
  middleware.ts                  # URL and query parsing
  verify-url.ts                  # Route pattern to RegExp helper
  response-api.ts                # Standard JSON response helper
  errors/                        # Custom application errors
  model/task.ts                  # Task storage and business operations
  http/controllers/tasks/        # Route handlers and HTTP tests
  scripts/import-csv.ts          # CSV import script
test/
  fixtures/tasks.csv             # Example CSV file
  setup.ts                       # Test database setup and cleanup
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The server listens on:

```text
http://localhost:8080
```

Run the test suite:

```bash
npm test
```

## CSV Import

The CSV import script reads a CSV file and sends a `POST /tasks` request for each row.

Example CSV format:

```csv
title,description
Task 01,Descricao da Task 01
Task 02,Descricao da Task 02
```

Run the script while the API server is running:

```bash
npx tsx src/scripts/import-csv.ts test/fixtures/tasks.csv
```

## Testing Strategy

The project uses two levels of tests:

- **Model tests** validate the task storage behavior directly, including creation, search, update, deletion, and completion rules.
- **HTTP tests** use Supertest against the native HTTP server to validate route behavior, status codes, and response bodies.

The tests use isolated JSON files through `test/setup.ts`, so test data does not depend on the main `tasks.json` file.

## Challenge Checklist

Use this checklist to keep track of the original challenge requirements:

- [x] Add biome and set sort import
- [x] Develop the `POST /tasks` route to create a new task
- [x] Install supertest for mock http requests
- [x] Create test for the above implementation
- [x] Develop the `GET /tasks` route to list all tasks
- [x] Implement TypeScript
- [x] Implement the search feature by `title` and `description` in the `GET /tasks` route
- [x] Develop the `PUT /tasks/:id` route to update a task
- [x] Add the ID existence validation in the `PUT /tasks/:id` route
- [x] Develop the `DELETE /tasks/:id` route to remove a task
- [x] Add the ID existence validation in the `DELETE /tasks/:id` route
- [x] Develop the `PATCH /tasks/:id/complete` route to toggle a task as completed/pending
- [x] Add the ID existence validation in the `PATCH /tasks/:id/complete` route
- [x] Create a separate script for task import
- [x] Use the `csv-parse` library to read the CSV file
- [x] Implement the logic to send a request to `POST /tasks` for each CSV line in the import script
