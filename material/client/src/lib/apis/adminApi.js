import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const getStats = async () => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/admin/stats`);
    if (!response.ok) {
        throw new Error("Failed to fetch admin stats");
    }
    return await response.json();
};

export { getStats };
