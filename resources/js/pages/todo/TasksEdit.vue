<template>
    <div class="p-6 w-[400px] m-auto">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Edit Task
            </h1>

            <!-- Loading State for Initial Fetch -->
            <div
                v-if="fetchTaskByIdLoading && !form.title"
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

            <!-- Error State for Initial Fetch -->
            <div
                v-else-if="fetchTaskByIdError"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
                <p class="font-medium">Error loading task:</p>
                <p>
                    {{
                        fetchTaskByIdError.message ||
                        "An unexpected error occurred"
                    }}
                </p>
                <button
                    @click="loadTask"
                    class="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>

            <!-- Edit Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title Field -->
                <div>
                    <label
                        for="title"
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Title <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        v-model="form.title"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        :class="{ 'border-red-500': errors.title }"
                        placeholder="Enter task title"
                    />
                    <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                        {{ errors.title }}
                    </p>
                </div>

                <!-- Status Field -->
                <div>
                    <label
                        for="status"
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Status <span class="text-red-500">*</span>
                    </label>
                    <select
                        id="status"
                        v-model="form.status"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        :class="{ 'border-red-500': errors.status }"
                    >
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <p v-if="errors.status" class="mt-1 text-sm text-red-600">
                        {{ errors.status }}
                    </p>
                </div>

                <!-- Description Field -->
                <div>
                    <label
                        for="description"
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        v-model="form.description"
                        rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        :class="{ 'border-red-500': errors.description }"
                        placeholder="Enter task description (optional)"
                    ></textarea>
                    <p
                        v-if="errors.description"
                        class="mt-1 text-sm text-red-600"
                    >
                        {{ errors.description }}
                    </p>
                </div>

                <!-- Form Actions -->
                <div class="flex gap-4 pt-4">
                    <button
                        type="submit"
                        :disabled="updateTaskLoading"
                        class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span
                            v-if="updateTaskLoading"
                            class="flex items-center justify-center"
                        >
                            <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Updating Task...
                        </span>
                        <span v-else>Update Task</span>
                    </button>

                    <button
                        type="button"
                        @click="goBack"
                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                <!-- Success Message -->
                <div
                    v-if="successMessage"
                    class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md"
                >
                    {{ successMessage }}
                </div>

                <!-- Error Message -->
                <div
                    v-if="updateTaskError"
                    class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md"
                >
                    <p class="font-medium">Error updating task:</p>
                    <p>
                        {{
                            updateTaskError.message ||
                            "An unexpected error occurred"
                        }}
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFetchTaskById } from "../../composables/api/read/useFetchTaskById";
import { useUpdateTask } from "../../composables/api/write/useUpdateTask";

const router = useRouter();
const route = useRoute();

// Get task ID from route params
const taskId = ref(route.params.id);

// Composables
const { taskById, fetchTaskByIdLoading, fetchTaskByIdError, fetchTaskById } =
    useFetchTaskById();
const { updateTask, updateTaskLoading, updateTaskError } = useUpdateTask();

// Form data
const form = reactive({
    title: "",
    status: "",
    description: "",
});

// Form validation errors
const errors = ref({});
const successMessage = ref("");

// Load task data
const loadTask = async () => {
    try {
        await fetchTaskById(taskId.value);
        if (taskById.value) {
            form.title = taskById.value.title || "";
            form.status = taskById.value.status || "";
            form.description = taskById.value.description || "";
        }
    } catch (error) {
        console.error("Error loading task:", error);
    }
};

// Form validation
const validateForm = () => {
    errors.value = {};

    if (!form.title.trim()) {
        errors.value.title = "Title is required";
    } else if (form.title.trim().length < 3) {
        errors.value.title = "Title must be at least 3 characters long";
    }

    if (!form.status) {
        errors.value.status = "Status is required";
    }

    if (form.description && form.description.length > 1000) {
        errors.value.description =
            "Description must be less than 1000 characters";
    }

    return Object.keys(errors.value).length === 0;
};

// Handle form submission
const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    try {
        const taskData = {
            title: form.title.trim(),
            status: form.status,
            description: form.description.trim() || "",
        };

        await updateTask(taskId.value, taskData);

        successMessage.value = "Task updated successfully!";

        // Redirect after successful update
        setTimeout(() => {
            router.push("/tasks");
        }, 1500);
    } catch (error) {
        console.error("Error updating task:", error);
        // The error is already handled by the useUpdateTask composable
    }
};

// Go back to previous page
const goBack = () => {
    router.back();
};

// Load task on component mount
onMounted(() => {
    loadTask();
});
</script>