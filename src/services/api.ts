
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://127.0.0.1:8000"
        : "https://api.sfxc.edu.ph",
    headers: {
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("sfxc_admin_token");

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    if (config.data instanceof FormData) {
        config.headers.delete("Content-Type");
    } else if (config.data && !config.headers.get("Content-Type")) {
        config.headers.set("Content-Type", "application/json");
    }

    return config;
});

export default api;
