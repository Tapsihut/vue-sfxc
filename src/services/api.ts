
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.sfxc.edu.ph",
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers.delete("Content-Type");
    } else if (config.data && !config.headers.get("Content-Type")) {
        config.headers.set("Content-Type", "application/json");
    }

    return config;
});

export default api;
