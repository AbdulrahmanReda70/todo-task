<template>
    <div class="p-4 sm:p-6">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
            >
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                    All Tasks
                </h1>
                <div
                    class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
                >
                    <span
                        class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                    >
                        {{ allTasks.length }} tasks
                    </span>
                    <button
                        @click="refreshTasks"
                        :disabled="fetchAllTasksLoading"
                        class="max-w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                    >
                        <span
                            v-if="fetchAllTasksLoading"
                            class="flex items-center justify-center"
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
                v-if="fetchAllTasksLoading && !allTasks.length"
                class="flex items-center justify-center py-8 sm:py-12"
            >
                <div class="text-center">
                    <svg
                        class="animate-spin mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-4"
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
                    <p class="text-sm sm:text-base text-gray-500">
                        Loading tasks...
                    </p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="fetchAllTasksError"
                class="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-3 rounded mb-4"
            >
                <p class="font-medium text-sm sm:text-base">
                    Error loading tasks:
                </p>
                <p class="text-sm sm:text-base">
                    {{
                        fetchAllTasksError.message ||
                        "An unexpected error occurred"
                    }}
                </p>
                <button
                    @click="refreshTasks"
                    class="mt-2 text-xs sm:text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!allTasks.length" class="text-center py-8 sm:py-12">
                <div
                    class="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-gray-400 mb-4"
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        ></path>
                    </svg>
                </div>
                <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    No tasks found
                </h3>
                <p class="text-sm sm:text-base text-gray-500 mb-4 px-4">
                    Get started by creating your first task.
                </p>
                <router-link
                    to="/tasks/create"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors"
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
                    v-for="task in allTasks"
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
import { useFetchAllTasks } from "../../composables/api/read/useFetchAllTasks";
import { useUpdateTask } from "../../composables/api/write/useUpdateTask";
import { useDeleteTask } from "../../composables/api/write/useDeleteTask";

const router = useRouter();

// Composables
const { allTasks, fetchAllTasksLoading, fetchAllTasksError, fetchAllTasks } =
    useFetchAllTasks();

const { updateTask } = useUpdateTask();
const { deleteTask } = useDeleteTask();

// Methods
const refreshTasks = async () => {
    try {
        await fetchAllTasks();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

const handleToggleComplete = async (taskId) => {
    try {
        const task = allTasks.value.find((t) => t.id === taskId);
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
        const task = allTasks.value.find((t) => t.id === taskId);
        if (task) {
            let newStatus = "pending";

            // Cycle through status: pending -> in-progress -> completed -> pending
            if (task.status === "pending") {
                newStatus = "in-progress";
            } else if (task.status === "in-progress") {
                newStatus = "completed";
            } else if (task.status === "completed") {
                newStatus = "pending";
            }

            await updateTask(taskId, { ...task, status: newStatus });
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

<style>
.scrollbar-hide {
    /* Hide scrollbar for Chrome, Safari and Opera */
    -webkit-scrollbar: hidden;
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
