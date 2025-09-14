<template>
    <div class="p-6">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-gray-900">
                    Completed Tasks
                </h1>
                <div class="flex items-center gap-4">
                    <span
                        class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                        {{ completedTasks.length }} tasks
                    </span>
                    <button
                        @click="refreshTasks"
                        :disabled="fetchCompletedTasksLoading"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                    >
                        <span
                            v-if="fetchCompletedTasksLoading"
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
                v-if="fetchCompletedTasksLoading && !completedTasks.length"
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
                    <p class="text-gray-500">Loading completed tasks...</p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="fetchCompletedTasksError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
                <p class="font-medium">Error loading completed tasks:</p>
                <p>
                    {{
                        fetchCompletedTasksError.message ||
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
            <div v-else-if="!completedTasks.length" class="text-center py-12">
                <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                    No completed tasks
                </h3>
                <p class="text-gray-500 mb-4">
                    You haven't completed any tasks yet. Keep up the great work!
                </p>
                <router-link
                    to="/tasks/pending"
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        ></path>
                    </svg>
                    View Pending Tasks
                </router-link>
            </div>

            <!-- Tasks List -->
            <div v-else class="space-y-3">
                <TodoItem
                    v-for="task in completedTasks"
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
import { useFetchCompletedTasks } from "../../composables/api/read/useFetchCompletedTasks";
import { useUpdateTask } from "../../composables/api/write/useUpdateTask";
import { useDeleteTask } from "../../composables/api/write/useDeleteTask";

const router = useRouter();

// Composables
const {
    completedTasks,
    fetchCompletedTasksLoading,
    fetchCompletedTasksError,
    fetchCompletedTasks,
} = useFetchCompletedTasks();

const { updateTask } = useUpdateTask();
const { deleteTask } = useDeleteTask();

// Methods
const refreshTasks = async () => {
    try {
        await fetchCompletedTasks();
    } catch (error) {
        console.error("Error fetching completed tasks:", error);
    }
};

const handleToggleComplete = async (taskId) => {
    try {
        const task = completedTasks.value.find((t) => t.id === taskId);
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
        const task = completedTasks.value.find((t) => t.id === taskId);
        if (task) {
            // Move from completed back to pending for rework
            await updateTask(taskId, { ...task, status: "pending" });
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
