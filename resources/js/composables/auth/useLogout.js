import { useRouter } from "vue-router";
import AuthService from "../../../services/AuthService";

export function useLogout() {
    const router = useRouter();
    const authService = new AuthService();

    const logout = async () => {
        try {
            // Clear local storage using the service
            authService.signout();

            // Redirect to login page
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return {
        logout,
    };
}
