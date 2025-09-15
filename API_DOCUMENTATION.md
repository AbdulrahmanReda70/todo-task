# Todo Task API Documentation

## Overview

This is a RESTful API for a Todo Task management system built with Laravel and Vue.js. The API provides authentication and CRUD operations for managing tasks.

**Base URL:** `http://127.0.0.1:8000/api`

## Authentication

The API uses Laravel Sanctum for authentication. All protected routes require a Bearer token in the Authorization header.

### Headers for Protected Routes

```
Authorization: Bearer {token}
Content-Type: application/json
```

---

## Authentication Endpoints

### 1. Sign Up

**POST** `/signup`

Register a new user account.

#### Request Body

```json
{
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

#### Validation Rules

-   `email`: Required, valid email, max 255 characters, must be unique
-   `password`: Required, minimum 8 characters, must be confirmed

#### Response (201 Created)

```json
{
    "user": {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    },
    "token": "1|abc123..."
}
```

#### Error Response (422 Validation Error)

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["This email is already registered."],
        "password": ["The password must be at least 8 characters long."]
    }
}
```

### 2. Sign In

**POST** `/signin`

Authenticate an existing user.

#### Request Body

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Validation Rules

-   `email`: Required, valid email, max 255 characters, must exist in users table
-   `password`: Required, minimum 8 characters

#### Response (200 OK)

```json
{
    "user": {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    },
    "token": "2|def456..."
}
```

#### Error Response (401 Unauthorized)

```json
{
    "message": "Invalid credentials"
}
```

---

## Task Management Endpoints

All task endpoints require authentication (`auth:sanctum` middleware).

### 1. Get All Tasks

**GET** `/tasks`

Retrieve all tasks for the authenticated user.

#### Response (200 OK)

```json
[
    {
        "id": 1,
        "user_id": 1,
        "title": "Complete project",
        "description": "Finish the todo app",
        "status": "pending",
        "due_date": "2025-09-20",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    }
]
```

### 2. Create Task

**POST** `/tasks`

Create a new task for the authenticated user.

#### Request Body

```json
{
    "title": "Complete project",
    "description": "Finish the todo app",
    "status": "pending",
    "due_date": "2025-09-20"
}
```

#### Validation Rules

-   `title`: Required, string, max 255 characters
-   `description`: Optional, string
-   `status`: Optional, must be one of: `completed`, `pending`, `in-progress`
-   `due_date`: Optional, valid date, must be today or future date

#### Response (201 Created)

```json
{
    "id": 1,
    "user_id": 1,
    "title": "Complete project",
    "description": "Finish the todo app",
    "status": "pending",
    "due_date": "2025-09-20",
    "created_at": "2025-09-15T10:00:00.000000Z",
    "updated_at": "2025-09-15T10:00:00.000000Z"
}
```

### 3. Get Single Task

**GET** `/tasks/{id}`

Retrieve a specific task by ID (only if it belongs to the authenticated user).

#### Response (200 OK)

```json
{
    "id": 1,
    "user_id": 1,
    "title": "Complete project",
    "description": "Finish the todo app",
    "status": "pending",
    "due_date": "2025-09-20",
    "created_at": "2025-09-15T10:00:00.000000Z",
    "updated_at": "2025-09-15T10:00:00.000000Z"
}
```

#### Error Response (404 Not Found)

```json
{
    "message": "Task not found or access denied"
}
```

### 4. Update Task

**PUT/PATCH** `/tasks/{id}`

Update a specific task (only if it belongs to the authenticated user).

#### Request Body

```json
{
    "title": "Updated title",
    "description": "Updated description",
    "status": "in-progress",
    "due_date": "2025-09-25"
}
```

#### Validation Rules

-   `title`: Optional, string, max 255 characters
-   `description`: Optional, string
-   `status`: Optional, must be one of: `completed`, `pending`, `in-progress`
-   `due_date`: Optional, valid date, must be today or future date

#### Response (200 OK)

```json
{
    "id": 1,
    "user_id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "status": "in-progress",
    "due_date": "2025-09-25",
    "created_at": "2025-09-15T10:00:00.000000Z",
    "updated_at": "2025-09-15T10:30:00.000000Z"
}
```

#### Error Response (404 Not Found)

```json
{
    "message": "Task not found or access denied"
}
```

### 5. Delete Task

**DELETE** `/tasks/{id}`

Delete a specific task (only if it belongs to the authenticated user).

#### Response (200 OK)

```json
{
    "message": "Task deleted successfully"
}
```

#### Error Response (404 Not Found)

```json
{
    "message": "Task not found or access denied"
}
```

### 6. Search Tasks

**GET** `/tasks/search`

Search tasks based on criteria.

#### Query Parameters

-   `status`: Filter by status (`completed`, `pending`, `in-progress`)
-   `due_date`: Filter by due date
-   `keyword`: Search in title and description

#### Example Request

```
GET /tasks/search?status=pending&keyword=project
```

#### Response (200 OK)

```json
[
    {
        "id": 1,
        "user_id": 1,
        "title": "Complete project",
        "description": "Finish the todo app",
        "status": "pending",
        "due_date": "2025-09-20",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    }
]
```

### 7. Get Pending Tasks

**GET** `/tasks/pending`

Retrieve all pending tasks for the authenticated user.

#### Response (200 OK)

```json
[
    {
        "id": 1,
        "user_id": 1,
        "title": "Pending task",
        "description": "Task description",
        "status": "pending",
        "due_date": "2025-09-20",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    }
]
```

### 8. Get In-Progress Tasks

**GET** `/tasks/in-progress`

Retrieve all in-progress tasks for the authenticated user.

#### Response (200 OK)

```json
[
    {
        "id": 2,
        "user_id": 1,
        "title": "In-progress task",
        "description": "Task description",
        "status": "in-progress",
        "due_date": "2025-09-22",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    }
]
```

### 9. Get Completed Tasks

**GET** `/tasks/completed`

Retrieve all completed tasks for the authenticated user.

#### Response (200 OK)

```json
[
    {
        "id": 3,
        "user_id": 1,
        "title": "Completed task",
        "description": "Task description",
        "status": "completed",
        "due_date": "2025-09-18",
        "created_at": "2025-09-15T10:00:00.000000Z",
        "updated_at": "2025-09-15T10:00:00.000000Z"
    }
]
```

---

## JavaScript Services

The frontend uses service classes to interact with the API:

### AuthService

-   `signin(credentials)` - Sign in user
-   `signup(userData)` - Register new user
-   `signout()` - Clear local storage and sign out

### TodoService

-   `getAll()` - Get all tasks
-   `getById(id)` - Get task by ID
-   `create(task)` - Create new task
-   `update(id, task)` - Update existing task
-   `delete(id)` - Delete task
-   `search(query)` - Search tasks with criteria
-   `getPending()` - Get pending tasks
-   `getInProgress()` - Get in-progress tasks
-   `getCompleted()` - Get completed tasks

---

## Status Codes

-   **200 OK** - Request successful
-   **201 Created** - Resource created successfully
-   **401 Unauthorized** - Invalid credentials or missing token
-   **404 Not Found** - Resource not found or access denied
-   **422 Unprocessable Entity** - Validation errors

---

## Error Handling

The API returns consistent error responses:

### Validation Errors (422)

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "field_name": ["Error message"]
    }
}
```

### Authentication Errors (401)

```json
{
    "message": "Invalid credentials"
}
```

### Not Found Errors (404)

```json
{
    "message": "Task not found or access denied"
}
```

---

## Task Status Values

The task status field accepts the following values:

-   `pending` - Task is not started
-   `in-progress` - Task is currently being worked on
-   `completed` - Task is finished

---

## Notes

1. All timestamps are in UTC format
2. The `due_date` field accepts dates in `YYYY-MM-DD` format
3. Tasks are automatically associated with the authenticated user
4. Users can only access their own tasks
5. The API includes CORS middleware for frontend integration
6. Token-based authentication is handled via Laravel Sanctum
