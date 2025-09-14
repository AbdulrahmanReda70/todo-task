<template>
    <!-- Header - Only visible on mobile -->
    <header
        v-if="isMobile"
        class="bg-white relative z-333 border-b border-gray-200 px-4 py-3 flex items-center justify-between"
    >
        <!-- Toggle Sidebar Button -->
        <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
            <PanelLeft class="w-5 h-5 text-gray-600" />
        </button>

        <!-- App Logo -->
        <div class="flex items-center">
            <CheckSquare class="w-6 h-6 text-blue-600" />
        </div>

        <!-- Signout Button -->
        <button
            @click="handleSignout"
            class="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
            title="Sign Out"
        >
            <LogOut class="w-5 h-5 text-red-600" />
        </button>
    </header>
</template>

<script setup>
import { PanelLeft, CheckSquare, LogOut } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useScreenSize } from "@/composables/useScreenSize";
import AuthService from "../../services/AuthService";

const { isMobile } = useScreenSize();
const router = useRouter();
const authService = new AuthService();

defineProps({
    toggleSidebar: Function,
});

const handleSignout = () => {
    authService.signout();
    router.push("/login");
};
</script>
