import { browser } from "$app/environment";

export const authFetch = async (url, options = {}) => {
    // Get token from localStorage
    let token = null;
    if (browser) {
        token = localStorage.getItem("token");
    }

    // Add Authorization header if token exists
    const headers = {
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Make the fetch request
    const response = await fetch(url, {
        ...options,
        headers,
    });

    // If unauthorized (401), logout and redirect to login
    if (response.status === 401) {
        if (browser) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
    }

    return response;
};
