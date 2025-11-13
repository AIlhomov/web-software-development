import { PUBLIC_API_URL } from "$env/static/public";

const register = async (email, password) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const login = async (email, password) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

export { register, login };
