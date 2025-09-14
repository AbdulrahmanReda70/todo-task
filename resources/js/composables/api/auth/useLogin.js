import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../../../services/AuthService";

export function useLogin() {
    const isLoggingIn = ref(false);
    const loginError = ref(null);
    const router = useRouter();
    const authService = new AuthService();

    const login = async (credentials) => {
        isLoggingIn.value = true;
        loginError.value = null;

        try {
            const data = await authService.signin(credentials);

            // Store auth data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to tasks page
            router.push("/tasks");

            return data;
        } catch (error) {
            loginError.value = error.message;
            throw error;
        } finally {
            isLoggingIn.value = false;
        }
    };

    return {
        login,
        isLoggingIn,
        loginError,
    };
}
