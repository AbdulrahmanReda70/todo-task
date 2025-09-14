<template>
    <div class="p-6">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Search Tasks</h1>

            <!-- Search Form -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <form @submit.prevent="handleSearch" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Keyword Search -->
                        <div>
                            <label
                                for="keyword"
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Search by keyword
                            </label>
                            <input
                                id="keyword"
                                v-model="searchForm.keyword"
                                type="text"
                                placeholder="Search in title or description..."
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <!-- Status Filter -->
                        <div>
                            <label
                                for="status"
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Filter by status
                            </label>
                            <select
                                id="status"
                                v-model="searchForm.status"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All statuses</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <!-- Search Button -->
                        <div class="flex items-end">
                            <button
                                type="submit"
                                :disabled="searchTasksLoading"
                                class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                <span
                                    v-if="searchTasksLoading"
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
                                    Searching...
                                </span>
                                <span v-else>Search</span>
                            </button>
                        </div>
                    </div>
                </form>

                <!-- Clear Search -->
                <div v-if="hasSearched" class="mt-4">
                    <button
                        @click="clearSearch"
                        class="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Clear search and show all tasks
                    </button>
                </div>
            </div>

            <!-- Search Results -->
            <div v-if="hasSearched">
                <!-- Results Header -->
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-gray-900">
                        Search Results
                        <span class="text-sm font-normal text-gray-600">
                            ({{ searchedTasks.length }} tasks found)
                        </span>
                    </h2>
                </div>

                <!-- Loading State -->
                <div
                    v-if="searchTasksLoading"
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
                        <p class="text-gray-500">Searching tasks...</p>
                    </div>
                </div>

                <!-- Error State -->
                <div
                    v-else-if="searchTasksError"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                >
                    <p class="font-medium">Error searching tasks:</p>
                    <p>
                        {{
                            searchTasksError.message ||
                            "An unexpected error occurred"
                        }}
                    </p>
                    <button
                        @click="handleSearch"
                        class="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>

                <!-- No Results -->
                <div
                    v-else-if="!searchedTasks.length"
                    class="text-center py-12"
                >
                    <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">
                        No tasks found
                    </h3>
                    <p class="text-gray-500">
                        Try adjusting your search criteria.
                    </p>
                </div>

                <!-- Results List -->
                <div v-else class="space-y-3">
                    <div
                        v-for="task in searchedTasks"
                        :key="task.id"
                        @click="viewTask(task.id)"
                        class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-900 mb-1">
                                    {{ task.title }}
                                </h3>
                                <p
                                    v-if="task.description"
                                    class="text-sm text-gray-600 mb-2 line-clamp-2"
                                >
                                    {{ task.description }}
                                </p>
                                <div class="flex items-center gap-2">
                                    <span
                                        class="px-2 py-1 text-xs font-medium rounded-full"
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
                            <div class="text-gray-400">
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useSearchTasks } from "../../composables/api/read/useSearchTasks";

const router = useRouter();

// Composables
const { searchedTasks, searchTasksLoading, searchTasksError, searchTasks } =
    useSearchTasks();

// Search form
const searchForm = reactive({
    keyword: "",
    status: "",
});

const hasSearched = ref(false);

// Methods
const handleSearch = async () => {
    try {
        const searchCriteria = {};

        if (searchForm.keyword.trim()) {
            searchCriteria.keyword = searchForm.keyword.trim();
        }

        if (searchForm.status) {
            searchCriteria.status = searchForm.status;
        }

        // Only search if we have some criteria
        if (Object.keys(searchCriteria).length > 0) {
            await searchTasks(searchCriteria);
            hasSearched.value = true;
        }
    } catch (error) {
        console.error("Error searching tasks:", error);
    }
};

const clearSearch = () => {
    searchForm.keyword = "";
    searchForm.status = "";
    searchedTasks.value = [];
    hasSearched.value = false;
};

const viewTask = (taskId) => {
    router.push(`/tasks/${taskId}`);
};

const formatStatus = (status) => {
    const statusMap = {
        pending: "Pending",
        "in-progress": "In Progress",
        completed: "Completed",
    };
    return statusMap[status] || status;
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
}
</style>
