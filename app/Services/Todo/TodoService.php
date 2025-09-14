<?php

namespace App\Services\Todo;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TodoService
{
    /**
     * Get all tasks for the authenticated user.
     */
    public function getAllTasks()
    {
        $tasks = Auth::user()->tasks()->latest()->get();
        return TaskResource::collection($tasks);
    }

    /**
     * Create a new task for the authenticated user.
     */
    public function createTask(array $data)
    {
        $task = Auth::user()->tasks()->create($data);
        return new TaskResource($task);
    }

    /**
     * Get a specific task by ID (only if it belongs to the authenticated user).
     */
    public function getTask(Task $task)
    {
        // We just need to ensure it belongs to the authenticated user
        if ($task->user_id !== Auth::id()) {
            return null;
        }

        return new TaskResource($task);
    }

    /**
     * Update a specific task.
     */
    public function updateTask(Task $task, array $data)
    {
        if ($task->user_id !== Auth::id()) {
            return null;
        }

        $task->update($data);
        return new TaskResource($task->fresh());
    }

    /**
     * Delete a specific task.
     */
    public function deleteTask(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return false;
        }

        return $task->delete();
    }

    public function searchTasks(array $criteria)
    {
        $query = Auth::user()->tasks();

        if (isset($criteria['status'])) {
            $query->where('status', $criteria['status']);
        }

        if (isset($criteria['due_date'])) {
            $query->whereDate('due_date', $criteria['due_date']);
        }

        if (isset($criteria['keyword'])) {
            $keyword = $criteria['keyword'];
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%$keyword%")
                    ->orWhere('description', 'like', "%$keyword%");
            });
        }

        $tasks = $query->latest()->paginate();
        return TaskResource::collection($tasks);
    }

    /**
     * Get tasks by status for the authenticated user.
     */
    public function getTasksByStatus(string $status)
    {
        $tasks = Auth::user()->tasks()
            ->where('status', $status)
            ->latest()
            ->get();
        return TaskResource::collection($tasks);
    }
};
