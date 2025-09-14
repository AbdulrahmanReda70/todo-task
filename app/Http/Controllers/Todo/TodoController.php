<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Http\Requests\Todo\CreateTaskRequest;
use App\Http\Requests\Todo\UpdateTaskRequest;
use App\Models\Task;
use App\Services\Todo\TodoService;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(TodoService $todoService)   // GET /tasks → list all
    {
        $tasks = $todoService->getAllTasks();
        return response()->json($tasks, 200);
    }

    public function store(CreateTaskRequest $request, TodoService $todoService) // POST /tasks → save new
    {
        $validatedData = $request->validated();
        $task = $todoService->createTask($validatedData);
        return response()->json($task, 201);
    }

    public function show(Task $task, TodoService $todoService) // GET /tasks/{id} → show one
    {
        $task = $todoService->getTask($task);

        if (!$task) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        return response()->json($task, 200);
    }

    public function update(UpdateTaskRequest $request, Task $task, TodoService $todoService) // PUT/PATCH /tasks/{id} → update
    {
        $validatedData = $request->validated();
        $updatedTask = $todoService->updateTask($task, $validatedData);

        if (!$updatedTask) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        return response()->json($updatedTask, 200);
    }

    public function destroy(Task $task, TodoService $todoService) // DELETE /tasks/{id} → delete
    {
        $deleted = $todoService->deleteTask($task);

        if (!$deleted) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }

    public function search(Request $request, TodoService $todoService)
    {
        $criteria = $request->only(['status', 'due_date', 'keyword']);
        $tasks = $todoService->searchTasks($criteria);
        return response()->json($tasks, 200);
    }

    public function pending(TodoService $todoService)
    {
        $tasks = $todoService->getTasksByStatus('pending');
        return response()->json($tasks, 200);
    }

    public function inProgress(TodoService $todoService)
    {
        $tasks = $todoService->getTasksByStatus('in-progress');
        return response()->json($tasks, 200);
    }

    public function completed(TodoService $todoService)
    {
        $tasks = $todoService->getTasksByStatus('completed');
        return response()->json($tasks, 200);
    }
}
