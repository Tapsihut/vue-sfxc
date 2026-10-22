
import api from "./api";

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

interface LoginResponse {
    message: string;
    token: string;
    token_type: string;
    user: AdminUser;
}

interface UserResponse {
    user: AdminUser;
}

export async function login(
    email: string,
    password: string,
): Promise<AdminUser> {
    // Clear any previous token before attempting login.
    sessionStorage.removeItem("sfxc_admin_token");

    const response = await api.post<LoginResponse>("/api/login", {
        email,
        password,
    });

    const { token, user } = response.data;

    if (!token || !user?.is_admin) {
        throw new Error("Valid admin authentication was not returned.");
    }

    // Save the Bearer token for subsequent API requests.
    sessionStorage.setItem("sfxc_admin_token", token);

    return user;
}

export async function getCurrentUser(): Promise<AdminUser> {
    if (!sessionStorage.getItem("sfxc_admin_token")) {
        throw new Error("You are not logged in.");
    }

    const response = await api.get<UserResponse>("/api/user");
    const user = response.data.user;

    if (!user?.is_admin) {
        sessionStorage.removeItem("sfxc_admin_token");
        throw new Error("Admin access is required.");
    }

    return user;
}

export async function logout(): Promise<void> {
    try {
        if (sessionStorage.getItem("sfxc_admin_token")) {
            await api.post("/api/logout");
        }
    } finally {
        // Always clear the local token, even if the API request fails.
        sessionStorage.removeItem("sfxc_admin_token");
    }
}

export function isAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem("sfxc_admin_token"));
}

// Default export for components using:
// import authService from "@/services/auth"
const authService = {
    login,
    getCurrentUser,
    logout,
    isAuthenticated,
};

export default authService;
