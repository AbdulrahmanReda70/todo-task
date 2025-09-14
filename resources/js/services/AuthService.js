import api from "./api";

class AuthService {
    async signin(credentials) {
        return (await api.post("/signin", credentials)).data;
    }

    async signup(userData) {
        return (await api.post("/signup", userData)).data;
    }

    async signout() {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

export default AuthService;
