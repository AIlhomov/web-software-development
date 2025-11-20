import { browser } from "$app/environment";
import { login as loginApi, register as registerApi } from "$lib/apis/authApi.js";

const USER_KEY = "user";
const TOKEN_KEY = "token";

let user = $state(null);
let token = $state(null);

if (browser) {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedUser) {
        user = JSON.parse(storedUser);
    }
    if (storedToken) {
        token = storedToken;
    }
}

const useAuthState = () => {
    return {
        get user() {
            return user;
        },
        get token() {
            return token;
        },
        login: async (email, password) => {
            const response = await loginApi({ email, password });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Login failed");
            }

            const data = await response.json();
            
            if (data.user && data.token) {
                user = data.user;
                token = data.token;
                
                if (browser) {
                    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
                    localStorage.setItem(TOKEN_KEY, data.token);
                }
            }
        },
        register: async (email, password) => {
            const response = await registerApi({ email, password });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Registration failed");
            }

            const data = await response.json();
            return data;
        },
        logout: () => {
            user = null;
            token = null;

            if (browser) {
                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(TOKEN_KEY);
            }
        },
    };
};

export { useAuthState };