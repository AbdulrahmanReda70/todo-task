import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let customError = {
            message: "An unknown error occurred",
            status: null,
            data: null,
            isNetworkError: false,
        };

        if (error.response) {
            // Server responded with error
            customError.message =
                error.response.data?.message || "Server error";
            customError.status = error.response.status;
            customError.data = error.response.data;
        } else if (error.request) {
            // Request sent but no response
            customError.message = "Network error: No response received";
            customError.isNetworkError = true;
        } else {
            // Something wrong in Axios setup
            customError.message = error.message;
        }

        return Promise.reject(customError);
    }
);

export default api;
