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
    </header>
</template>

<script setup>
import { PanelLeft, CheckSquare } from "lucide-vue-next";
import { useScreenSize } from "@/composables/useScreenSize";

const { isMobile } = useScreenSize();

defineProps({
    toggleSidebar: Function,
});
</script>
