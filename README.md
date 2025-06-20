# TASK_MANAGER_WEB

A full-stack Task Manager web application built with **TypeScript**, **Express**, **TypeORM**, **SQLite** (backend), and **Next.js**, **React**, **Tailwind CSS** (frontend).

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Development Workflow](#development-workflow)
- [License](#license)

---

## Features

- Create, read, update, and delete tasks
- Task status: To Do, In Progress, Done
- Due date support
- Responsive, modern UI with Tailwind CSS
- Persistent storage with SQLite
- Type-safe codebase (TypeScript)

---

## Project Structure

```
Task_Manager_web/
  backend/      # Express + TypeORM + SQLite API
    src/
      entity/   # Task entity definition
      routes/   # API route handlers
      index.ts  # Main server entry point
      data-source.ts # DB config
    package.json
    tsconfig.json
  frontend/     # Next.js + React + Tailwind CSS UI
    pages/      # Main pages (index, add, edit)
    lib/        # API utility functions
    types/      # TypeScript types
    package.json
    tsconfig.json
    tailwind.config.js
  README.md
```

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Environment variables:**
   - By default, the backend uses `database.sqlite` in the backend folder.
   - You can set a custom database file by creating a `.env` file:
     ```
     DB_NAME=your_database_file.sqlite
     PORT=3001
     ```

3. **Run the backend server:**
   ```sh
   npm start
   ```
   The server will start on `http://localhost:3001` by default.

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Environment variables:**
   - Create a `.env.local` file in the `frontend` directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

3. **Run the frontend app:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable   | Description                | Default             |
|------------|----------------------------|---------------------|
| DB_NAME    | SQLite DB file name        | database.sqlite     |
| PORT       | Backend server port        | 3001                |

### Frontend (`frontend/.env.local`)
| Variable             | Description                | Example                |
|----------------------|----------------------------|------------------------|
| NEXT_PUBLIC_API_URL  | Backend API base URL       | http://localhost:3001  |

---

## API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/tasks`         | Get all tasks              |
| GET    | `/tasks/:id`     | Get a single task by ID    |
| POST   | `/tasks`         | Create a new task          |
| PUT    | `/tasks/:id`     | Update a task by ID        |
| DELETE | `/tasks/:id`     | Delete a task by ID        |

**Task object:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string | null",
  "status": "todo" | "in_progress" | "done",
  "dueDate": "YYYY-MM-DD" | null,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## Usage

### 1. Add a Task

- Click "Add New Task" on the homepage.
- Fill in the title, description, status, and due date.
- Click "Save Task".

### 2. Edit a Task

- Click "Edit" on any task card.
- Update the fields and click "Update Task".

### 3. Delete a Task

- Click "Delete" on any task card.

---

## Development Workflow

- **Backend:** TypeScript, Express, TypeORM, SQLite
  - All code in `backend/src`
  - Main entry: `src/index.ts`
  - DB config: `src/data-source.ts`
  - Entity: `src/entity/Task.ts`
  - API routes: `src/routes/taskRoutes.ts` (integrated in `index.ts`)

- **Frontend:** Next.js, React, Tailwind CSS
  - Main pages: `frontend/pages/`
    - `index.tsx`: Task list
    - `add.tsx`: Add task
    - `edit/[id].tsx`: Edit task
  - API utilities: `frontend/lib/api.js`
  - Types: `frontend/types/task.tsx`
  - Styling: Tailwind CSS (`tailwind.config.js`, `globals.css`)

- **Type Safety:** Shared task types and status enums in both frontend and backend.

- **No `node_modules` in repo:** Install dependencies with `npm install` in each folder.

---

## License

This project is licensed under the MIT License.

---

**Happy task managing!**
