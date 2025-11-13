import { login as loginApi, register as registerApi } from "$lib/apis/authApi.js";
import { browser } from "$app/environment";

// Initialize state from localStorage if in browser
const getInitialState = () => {
    if (browser) {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                return {
                    user: JSON.parse(storedUser),
                    token: storedToken,
                };
            } catch (e) {
                // Invalid data in localStorage, clear it
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    }
    return {
        user: null,
        token: null,
    };
};

let authState = $state(getInitialState());

const useAuthState = () => {
    return {
        get user() {
            return authState.user;
        },
        get token() {
            return authState.token;
        },
        get isAuthenticated() {
            return authState.user !== null && authState.token !== null;
        },
        login: async (email, password) => {
            const response = await loginApi(email, password);
            if (response.error) {
                return { success: false, error: response.error };
            }

            const { user, token, message, error } = response.data;

            // Check if there's an error in the response
            if (error) {
                return { success: false, error };
            }

            // Check if login was successful - we should have both user and token
            if (user && token) {
                authState.user = user;
                authState.token = token;

                // Store in localStorage
                if (browser) {
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                }

                return { success: true };
            } else {
                return { success: false, error: message || error || "Login failed" };
            }
        },
        register: async (email, password) => {
            const response = await registerApi(email, password);
            if (response.error) {
                return { success: false, error: response.error };
            }

            const { message } = response.data;
            return { success: true, message };
        },
        logout: () => {
            authState.user = null;
            authState.token = null;

            // Clear localStorage
            if (browser) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        },
    };
};

export { useAuthState };
