<template>
    <div class="min-h-screen" :class="isAuthPage ? 'bg-white' : 'bg-gray-50'">
        <!-- Header - Only on mobile and not on auth pages -->
        <Header v-if="!isAuthPage" :toggle-sidebar="toggleSidebar" />

        <div class="flex">
            <!-- Sidebar - Only show when not on auth pages -->
            <Sidebar
                v-if="!isAuthPage"
                :is-open="isSidebarOpen"
                @close="closeSidebar"
            />

            <!-- Main Content -->
            <main :class="['transition-all duration-300 ease-in-out grow']">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";

const route = useRoute();

const isSidebarOpen = ref(false);

// Check if current route is an auth page
const isAuthPage = computed(() => {
    return route.path === "/login" || route.path === "/register";
});

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
    isSidebarOpen.value = false;
};
</script>
