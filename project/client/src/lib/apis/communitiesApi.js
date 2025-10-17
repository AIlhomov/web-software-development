import { PUBLIC_API_URL } from "$env/static/public";

const getCommunities = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`);
    if (!response.ok) {
        throw new Error("Failed to fetch communities");
    }
    return await response.json();
};

const getCommunity = async (communityId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch community");
    }
    return await response.json();
};

const createCommunity = async (community) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(community),
    });
    if (!response.ok) {
        throw new Error("Failed to create community");
    }
    return await response.json();
};

const deleteCommunity = async (communityId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete community");
    }
    return await response.json();
};

export { getCommunities, getCommunity, createCommunity, deleteCommunity };
