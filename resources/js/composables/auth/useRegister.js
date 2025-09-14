import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../../../services/AuthService";

export function useRegister() {
    const isRegistering = ref(false);
    const registerError = ref(null);
    const router = useRouter();
    const authService = new AuthService();

    const register = async (userData) => {
        isRegistering.value = true;
        registerError.value = null;

        try {
            const data = await authService.signup(userData);

            // Store auth data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to tasks page
            router.push("/tasks");

            return data;
        } catch (error) {
            // Handle validation errors from axios interceptor
            if (error.data && error.data.errors) {
                const errorMessages = Object.values(error.data.errors).flat();
                registerError.value = errorMessages.join(", ");
            } else {
                registerError.value = error.message;
            }
            throw error;
        } finally {
            isRegistering.value = false;
        }
    };

    return {
        register,
        isRegistering,
        registerError,
    };
}
