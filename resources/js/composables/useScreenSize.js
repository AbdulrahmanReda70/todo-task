import { ref, computed, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener("resize", updateScreenWidth);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", updateScreenWidth);
    });

    const isMobile = computed(() => screenWidth.value < 768); // md breakpoint
    const isTablet = computed(
        () => screenWidth.value >= 768 && screenWidth.value < 1024
    ); // lg breakpoint
    const isDesktop = computed(() => screenWidth.value >= 1024);

    return {
        screenWidth,
        isMobile,
        isTablet,
        isDesktop,
    };
}
