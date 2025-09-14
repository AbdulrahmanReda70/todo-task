<template>
    <div class="p-6">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Pending Tasks</h1>
                <div class="flex items-center gap-4">
                    <span
                        class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                    >
                        {{ pendingTasks.length }} tasks
                    </span>
                    <button
                        @click="refreshTasks"
                        :disabled="fetchPendingTasksLoading"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                    >
                        <span
                            v-if="fetchPendingTasksLoading"
                            class="flex items-center"
                        >
                            <svg
                                class="animate-spin -ml-1 mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Loading...
                        </span>
                        <span v-else>Refresh</span>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div
                v-if="fetchPendingTasksLoading && !pendingTasks.length"
                class="flex items-center justify-center py-12"
            >
                <div class="text-center">
                    <svg
                        class="animate-spin mx-auto h-12 w-12 text-gray-400 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p class="text-gray-500">Loading pending tasks...</p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="fetchPendingTasksError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
                <p class="font-medium">Error loading pending tasks:</p>
                <p>
                    {{
                        fetchPendingTasksError.message ||
                        "An unexpected error occurred"
                    }}
                </p>
                <button
                    @click="refreshTasks"
                    class="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!pendingTasks.length" class="text-center py-12">
                <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        ></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                    No pending tasks
                </h3>
                <p class="text-gray-500 mb-4">
                    You don't have any pending tasks at the moment.
                </p>
                <router-link
                    to="/tasks/create"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                        ></path>
                    </svg>
                    Create Task
                </router-link>
            </div>

            <!-- Tasks List -->
            <div v-else class="space-y-3">
                <TodoItem
                    v-for="task in pendingTasks"
                    :key="task.id"
                    :id="task.id"
                    :title="task.title"
                    :completed="task.status === 'completed'"
                    :status="task.status"
                    :description="task.description"
                    @toggle-complete="handleToggleComplete"
                    @move-to="handleMoveTo"
                    @edit="handleEdit"
                    @delete="handleDelete"
                    @view="handleView"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import TodoItem from "../../components/todo/TodoItem.vue";
import { useFetchPendingTasks } from "../../composables/api/read/useFetchPendingTasks";
import { useUpdateTask } from "../../composables/api/write/useUpdateTask";
import { useDeleteTask } from "../../composables/api/write/useDeleteTask";

const router = useRouter();

// Composables
const {
    pendingTasks,
    fetchPendingTasksLoading,
    fetchPendingTasksError,
    fetchPendingTasks,
} = useFetchPendingTasks();

const { updateTask } = useUpdateTask();
const { deleteTask } = useDeleteTask();

// Methods
const refreshTasks = async () => {
    try {
        await fetchPendingTasks();
    } catch (error) {
        console.error("Error fetching pending tasks:", error);
    }
};

const handleToggleComplete = async (taskId) => {
    try {
        const task = pendingTasks.value.find((t) => t.id === taskId);
        if (task) {
            const newStatus =
                task.status === "completed" ? "pending" : "completed";
            await updateTask(taskId, { ...task, status: newStatus });
            await refreshTasks(); // Refresh the list after update
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

const handleMoveTo = async (taskId) => {
    try {
        const task = pendingTasks.value.find((t) => t.id === taskId);
        if (task) {
            // Move from pending to in-progress
            await updateTask(taskId, { ...task, status: "in-progress" });
            await refreshTasks(); // Refresh the list after update
        }
    } catch (error) {
        console.error("Error moving task:", error);
    }
};

const handleEdit = (taskId) => {
    router.push(`/tasks/${taskId}/edit`);
};

const handleDelete = async (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
        try {
            await deleteTask(taskId);
            await refreshTasks(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
};

const handleView = (taskId) => {
    router.push(`/tasks/${taskId}`);
};

// Lifecycle
onMounted(() => {
    refreshTasks();
});
</script>
