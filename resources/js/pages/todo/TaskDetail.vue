<template>
    <div class="p-6">
        <div class="max-w-3xl mx-auto">
            <!-- Loading State -->
            <div
                v-if="fetchTaskLoading"
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
                    <p class="text-gray-500">Loading task...</p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="fetchTaskError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
                <p class="font-medium">Error loading task:</p>
                <p>{{ fetchTaskError.message || "Task not found" }}</p>
                <div class="mt-4">
                    <router-link
                        to="/tasks"
                        class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Back to Tasks
                    </router-link>
                </div>
            </div>

            <!-- Task Details -->
            <div
                v-else-if="task"
                class="bg-white rounded-lg shadow-sm border border-gray-200"
            >
                <!-- Header -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <button
                                @click="goBack"
                                class="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 19l-7-7 7-7"
                                    ></path>
                                </svg>
                            </button>
                            <h1 class="text-2xl font-bold text-gray-900">
                                Task Details
                            </h1>
                        </div>

                        <div class="flex items-center gap-2">
                            <span
                                class="px-3 py-1 text-sm font-medium rounded-full"
                                :class="{
                                    'bg-yellow-100 text-yellow-800':
                                        task.status === 'pending',
                                    'bg-blue-100 text-blue-800':
                                        task.status === 'in-progress',
                                    'bg-green-100 text-green-800':
                                        task.status === 'completed',
                                }"
                            >
                                {{ formatStatus(task.status) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="px-6 py-6">
                    <!-- Title -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Title</label
                        >
                        <p
                            class="text-lg text-gray-900 bg-gray-50 rounded-md px-3 py-2"
                        >
                            {{ task.title }}
                        </p>
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Description</label
                        >
                        <div
                            class="bg-gray-50 rounded-md px-3 py-2 min-h-[100px]"
                        >
                            <p
                                v-if="task.description"
                                class="text-gray-900 whitespace-pre-wrap"
                            >
                                {{ task.description }}
                            </p>
                            <p v-else class="text-gray-500 italic">
                                No description provided
                            </p>
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Status</label
                        >
                        <div class="flex items-center gap-3">
                            <span
                                class="px-4 py-2 text-sm font-medium rounded-lg"
                                :class="{
                                    'bg-yellow-100 text-yellow-800':
                                        task.status === 'pending',
                                    'bg-blue-100 text-blue-800':
                                        task.status === 'in-progress',
                                    'bg-green-100 text-green-800':
                                        task.status === 'completed',
                                }"
                            >
                                {{ formatStatus(task.status) }}
                            </span>
                        </div>
                    </div>

                    <!-- Created/Updated Dates -->
                    <div
                        v-if="task.created_at || task.updated_at"
                        class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div v-if="task.created_at">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Created</label
                            >
                            <p
                                class="text-sm text-gray-600 bg-gray-50 rounded-md px-3 py-2"
                            >
                                {{ formatDate(task.created_at) }}
                            </p>
                        </div>
                        <div v-if="task.updated_at">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Last Updated</label
                            >
                            <p
                                class="text-sm text-gray-600 bg-gray-50 rounded-md px-3 py-2"
                            >
                                {{ formatDate(task.updated_at) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div
                    class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <button
                                @click="editTask"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <svg
                                    class="w-4 h-4 inline-block mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    ></path>
                                </svg>
                                Edit Task
                            </button>

                            <button
                                @click="toggleStatus"
                                :disabled="updateLoading"
                                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                <span v-if="updateLoading">Updating...</span>
                                <span v-else>{{
                                    getToggleText(task.status)
                                }}</span>
                            </button>
                        </div>

                        <button
                            @click="deleteTask"
                            :disabled="deleteLoading"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                        >
                            <span v-if="deleteLoading">Deleting...</span>
                            <span v-else>Delete Task</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchTaskById } from "../../composables/api/read/useFetchTaskById";
import { useUpdateTask } from "../../composables/api/write/useUpdateTask";
import { useDeleteTask } from "../../composables/api/write/useDeleteTask";

const router = useRouter();
const route = useRoute();

// Composables
const {
    taskById: task,
    fetchTaskByIdLoading: fetchTaskLoading,
    fetchTaskByIdError: fetchTaskError,
    fetchTaskById,
} = useFetchTaskById();
const { updateTask, updateTaskLoading } = useUpdateTask();
const { deleteTask: deleteTaskApi, deleteTaskLoading } = useDeleteTask();

// Reactive state
const updateLoading = ref(false);
const deleteLoading = ref(false);

// Methods
const loadTask = async () => {
    try {
        await fetchTaskById(route.params.id);
    } catch (error) {
        console.error("Error loading task:", error);
    }
};

const goBack = () => {
    router.back();
};

const editTask = () => {
    router.push(`/tasks/${task.value.id}/edit`);
};

const toggleStatus = async () => {
    if (!task.value) return;

    updateLoading.value = true;
    try {
        let newStatus = "pending";

        // Cycle through status
        if (task.value.status === "pending") {
            newStatus = "in-progress";
        } else if (task.value.status === "in-progress") {
            newStatus = "completed";
        } else if (task.value.status === "completed") {
            newStatus = "pending";
        }

        await updateTask(task.value.id, { ...task.value, status: newStatus });
        await loadTask(); // Refresh task data
    } catch (error) {
        console.error("Error updating task status:", error);
    } finally {
        updateLoading.value = false;
    }
};

const deleteTask = async () => {
    if (!task.value) return;

    if (
        confirm(
            "Are you sure you want to delete this task? This action cannot be undone."
        )
    ) {
        deleteLoading.value = true;
        try {
            await deleteTaskApi(task.value.id);
            router.push("/tasks");
        } catch (error) {
            console.error("Error deleting task:", error);
            deleteLoading.value = false;
        }
    }
};

const formatStatus = (status) => {
    const statusMap = {
        pending: "Pending",
        "in-progress": "In Progress",
        completed: "Completed",
    };
    return statusMap[status] || status;
};

const getToggleText = (status) => {
    const toggleMap = {
        pending: "Mark In Progress",
        "in-progress": "Mark Completed",
        completed: "Mark Pending",
    };
    return toggleMap[status] || "Change Status";
};

const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
        const date = new Date(dateString);
        return date.toLocaleString();
    } catch (error) {
        return dateString;
    }
};

// Lifecycle
onMounted(() => {
    loadTask();
});
</script>
