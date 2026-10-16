import api from "@/services/api";
import axios from "axios";

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

const authService = {
    async login(email: string, password: string) {
        try {
            console.log("[LOGIN DEBUG] Requesting CSRF cookie...");

            await api.get("/sanctum/csrf-cookie");

            console.log("[LOGIN DEBUG] Sending login request...");

            const response = await api.post("/api/login", {
                email,
                password,
            });

            console.log("[LOGIN DEBUG] Login successful:", response.data);

            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("[LOGIN DEBUG] Axios error:", {
                    message: error.message,
                    code: error.code,
                    url: error.config?.url,
                    baseURL: error.config?.baseURL,
                    method: error.config?.method,
                    status: error.response?.status,
                    response: error.response?.data,
                });
            } else {
                console.error("[LOGIN DEBUG] Non-Axios error:", error);
            }

            throw error;
        }
    },

    async getCurrentUser(): Promise<AdminUser> {
        const response = await api.get("/api/user");
        return response.data.user;
    },

    async logout(): Promise<void> {
        await api.post("/api/logout");
    },
};

export default authService;