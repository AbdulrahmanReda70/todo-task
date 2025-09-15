# Laravel Task App

A Laravel-based task management application with Vue.js frontend.

## 📚 API Documentation

Complete API documentation is available in [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md). It includes:

-   Authentication endpoints (signup/signin)
-   Task management CRUD operations
-   Search and filtering capabilities
-   Request/response examples

## Installation & Running with Docker

### Prerequisites

-   Docker & Docker Compose installed
-   Git

### Quick Start

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AbdulrahmanReda70/todo-task.git
    cd todo-task
    ```

2. **Create environment file:**

    ```bash
    # Linux/macOS
    cp .env.example .env

    # Windows (Command Prompt)
    copy .env.example .env

    # Windows (PowerShell)
    Copy-Item .env.example .env
    ```

3. **Build and start containers:**
    ```bash
    docker compose up --build # docker-compose up --build in older versions
    ```

The application will automatically:

-   Install PHP and Node.js dependencies
-   Generate application key
-   Wait for database to be ready
-   Run migrations
-   Seed the database
-   Start Laravel backend on port 8000
-   Start Vite development server on port 5173

### Accessing the Application

-   **From Browser:** http://localhost:8000
-   **Database:** MySQL on port 3307

### Useful Docker Commands

```bash
# Stop containers
docker-compose down

# View logs
docker-compose logs app

# Access app container
docker-compose exec app bash

# Run artisan commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed

# Rebuild containers
docker-compose up --build --force-recreate
```

### Manual Installation (Without Docker)

1. **Install dependencies:**

    ```bash
    composer install
    npm install
    ```

2. **Setup environment:**

    ```bash
    # Linux/macOS
    cp .env.example .env
    php artisan key:generate

    # Windows (Command Prompt)
    copy .env.example .env
    php artisan key:generate

    # Windows (PowerShell)
    Copy-Item .env.example .env
    php artisan key:generate
    ```

3. **Configure database in `.env` file**

4. **Run migrations and seeders:**

    ```bash
    php artisan migrate --seed
    ```

5. **Start development servers:**

    ```bash
    # Terminal 1 - Laravel backend
    php artisan serve

    # Terminal 2 - Frontend assets
    npm run dev
    ```

## Improvements Needed

### 1. Optimistic UI Updates

-   **Issue:** Users must wait for server responses before seeing UI changes
-   **Solution:** Implement optimistic updates so user actions reflect instantly in the UI
-   **Benefits:** Better user experience, perceived performance improvement
-   **Implementation:** Update frontend state immediately, rollback on server error

### 2. Caching Implementation

-   **Frontend Caching:**

    -   Implement browser caching for API responses
    -   Add service worker for offline functionality
    -   Cache static assets and API responses

-   **Backend Caching:**

    -   Add Redis for session and cache storage
    -   Implement query result caching
    -   Cache frequently accessed data (users, tasks)
    -   Add cache invalidation strategies

-   **Example Redis setup:**
    ```bash
    # Add to docker-compose.yml
    redis:
      image: redis:alpine
      ports:
        - "6379:6379"
    ```

### 3. Additional Improvements

-   Add real-time updates using WebSockets/Pusher
-   Implement proper error handling and user feedback
-   Add loading states for better UX
-   Implement proper validation on both frontend and backend
-   Add comprehensive testing suite
-   Implement proper logging and monitoring

## Development

-   **Backend:** Laravel 10 with API routes
-   **Frontend:** Vue.js 3 with Vite
-   **Database:** MySQL 8
-   **Styling:** Tailwind CSS
