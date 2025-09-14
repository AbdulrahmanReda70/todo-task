<template>
    <!-- Sidebar - Hidden on mobile, visible on desktop -->
    <aside
        v-if="!isMobile"
        class="relative right-0 top-0 h-screen bg-white border-r border-gray-200 w-64 z-30"
    >
        <!-- Sidebar Header -->
        <div class="p-4 border-b border-gray-100">
            <div class="flex items-center gap-x-2">
                <img
                    src="https://i.pravatar.cc"
                    class="w-6 h-6 rounded-full"
                    alt="User Avatar"
                />
                <span class="text-sm font-medium text-gray-700"
                    >Abdelhaman</span
                >
            </div>
        </div>

        <!-- Navigation -->
        <nav class="p-3 space-y-1">
            <!-- Add Task -->
            <RouterLink
                to="/tasks/create"
                class="nav-link text-red-600 font-medium"
                active-class="nav-link-active"
            >
                <CirclePlus class="nav-icon" />
                <span class="nav-text">Add Task</span>
            </RouterLink>

            <!-- Search -->
            <RouterLink
                to="/search"
                class="nav-link"
                active-class="nav-link-active"
            >
                <Search class="nav-icon text-gray-500" />
                <span class="nav-text">Search</span>
            </RouterLink>

            <!-- All Tasks -->
            <RouterLink
                to="/tasks"
                class="nav-link"
                active-class="nav-link-active"
            >
                <ListTodo class="nav-icon text-blue-500" />
                <span class="nav-text">All Tasks</span>
            </RouterLink>

            <!-- Divider -->
            <div class="border-t border-gray-100 my-2"></div>

            <!-- Task Status Links -->
            <RouterLink
                v-for="item in taskStatusLinks"
                :key="item.path"
                :to="item.path"
                class="nav-link"
                active-class="nav-link-active"
            >
                <component
                    :is="item.icon"
                    :class="`nav-icon ${item.iconColor}`"
                />
                <span class="nav-text">{{ item.label }}</span>
            </RouterLink>
        </nav>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    <div v-if="isMobile && isOpen" class="fixed inset-0 z-40">
        <!-- Background Overlay -->
        <div
            class="fixed inset-0 bg-black bg-opacity-50"
            @click="closeSidebar"
        ></div>

        <!-- Sidebar -->
        <aside
            class="fixed left-0 top-[61px] h-screen bg-white border-r border-gray-200 w-full transform transition-transform duration-300 ease-in-out translate-x-0"
        >
            <!-- Same content as desktop sidebar -->
            <div class="p-4">
                <div class="flex items-center gap-x-2">
                    <img
                        src="https://i.pravatar.cc/32"
                        class="w-6 h-6 rounded-full"
                        alt="User Avatar"
                    />
                    <span class="text-sm font-medium text-gray-700"
                        >Abdelhaman</span
                    >
                </div>
            </div>

            <nav class="p-3 space-y-1">
                <!-- Add Task -->
                <RouterLink
                    to="/tasks/create"
                    class="nav-link text-red-600 font-medium"
                    active-class="nav-link-active"
                    @click="handleNavClick"
                >
                    <CirclePlus class="nav-icon" />
                    <span class="nav-text">Add Task</span>
                </RouterLink>

                <!-- Search -->
                <RouterLink
                    to="/search"
                    class="nav-link"
                    active-class="nav-link-active"
                    @click="handleNavClick"
                >
                    <Search class="nav-icon text-gray-500" />
                    <span class="nav-text">Search</span>
                </RouterLink>

                <!-- All Tasks -->
                <RouterLink
                    to="/tasks"
                    class="nav-link"
                    active-class="nav-link-active"
                    @click="handleNavClick"
                >
                    <ListTodo class="nav-icon text-blue-500" />
                    <span class="nav-text">All Tasks</span>
                </RouterLink>

                <!-- Divider -->
                <div class="border-t border-gray-100 my-2"></div>

                <!-- Task Status Links -->
                <RouterLink
                    v-for="item in taskStatusLinks"
                    :key="item.path"
                    :to="item.path"
                    class="nav-link"
                    active-class="nav-link-active"
                    @click="handleNavClick"
                >
                    <component
                        :is="item.icon"
                        :class="`nav-icon ${item.iconColor}`"
                    />
                    <span class="nav-text">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import {
    CirclePlus,
    Search,
    ListTodo,
    Clock,
    PlayCircle,
    CheckCircle,
} from "lucide-vue-next";
import { useScreenSize } from "@/composables/useScreenSize";

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);

const { isMobile } = useScreenSize();

// Close sidebar
const closeSidebar = () => {
    emit("close");
};

// Handle navigation click - close sidebar on mobile
const handleNavClick = () => {
    if (isMobile.value) {
        closeSidebar();
    }
};

// Task status navigation links
const taskStatusLinks = [
    {
        path: "/tasks/pending",
        label: "Pending",
        icon: Clock,
        iconColor: "text-orange-500",
    },
    {
        path: "/tasks/in-progress",
        label: "In Progress",
        icon: PlayCircle,
        iconColor: "text-yellow-500",
    },
    {
        path: "/tasks/completed",
        label: "Completed",
        icon: CheckCircle,
        iconColor: "text-green-500",
    },
];
</script>

<style scoped>
.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    transition: background-color 200ms;
    color: #374151;
}

.nav-link:hover {
    background-color: #f3f4f6;
}

.nav-link-active {
    background-color: #eff6ff;
    color: #2563eb;
}

.nav-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}

.nav-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav-link-active .nav-text {
    color: #2563eb;
}
</style>
