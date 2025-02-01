import axios from "axios";

export const API_BASE_URL = "https://spring-boot-app-blogapp.onrender.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem("token");
        if (jwtToken) {
            config.headers["Authorization"] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
