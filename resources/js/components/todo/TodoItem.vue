<template>
    <div
        class="flex items-start sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200"
    >
        <!-- Left Section: Checkbox + Title -->
        <div
            class="flex items-start sm:items-center gap-x-3 flex-1 min-w-0 pr-2"
        >
            <!-- Checkbox -->
            <button
                @click="toggleComplete"
                class="flex-shrink-0 mt-0.5 sm:mt-0"
            >
                <div
                    :class="[
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200',
                        isCompleted
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-gray-400',
                    ]"
                >
                    <Check v-if="isCompleted" class="w-3 h-3 text-green-600" />
                </div>
            </button>

            <!-- Title -->
            <button
                @click="handleView"
                :class="[
                    'text-sm sm:text-base font-medium transition-colors duration-200 text-left hover:text-blue-600 cursor-pointer break-words leading-relaxed',
                    isCompleted
                        ? 'line-through text-gray-500'
                        : 'text-gray-900',
                ]"
            >
                {{ title }}
            </button>
        </div>

        <!-- Right Section: Action Icons -->
        <div class="flex items-center gap-x-1 flex-shrink-0">
            <!-- Move To -->
            <button
                @click="handleMoveTo"
                class="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                title="Move to"
            >
                <ArrowRight class="w-4 h-4 text-gray-500" />
            </button>

            <!-- Edit -->
            <button
                @click="handleEdit"
                class="p-1.5 sm:p-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                title="Edit"
            >
                <Pencil class="w-4 h-4 text-blue-500" />
            </button>

            <!-- Delete -->
            <button
                @click="handleDelete"
                class="p-1.5 sm:p-2 rounded-md hover:bg-red-50 transition-colors duration-200"
                title="Delete"
            >
                <Trash2 class="w-4 h-4 text-red-500" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { Check, ArrowRight, Pencil, Trash2 } from "lucide-vue-next";

const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
        validator: (value) =>
            ["pending", "in-progress", "completed"].includes(value),
    },
    description: {
        type: String,
        default: "",
    },
});

const emit = defineEmits([
    "toggle-complete",
    "move-to",
    "edit",
    "delete",
    "view",
]);

// Computed property for completion state
const isCompleted = computed(() => props.completed);

// Event handlers
const toggleComplete = () => {
    emit("toggle-complete", props.id);
};

const handleMoveTo = () => {
    emit("move-to", props.id);
};

const handleEdit = () => {
    emit("edit", props.id);
};

const handleDelete = () => {
    emit("delete", props.id);
};

const handleView = () => {
    emit("view", props.id);
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
