import { PUBLIC_API_URL } from "$env/static/public";

const getCommunities = async () => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const getCommunity = async (communityId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const createCommunity = async (community) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(community),
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

const deleteCommunity = async (communityId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`, {
            method: "DELETE",
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

export { getCommunities, getCommunity, createCommunity, deleteCommunity };
