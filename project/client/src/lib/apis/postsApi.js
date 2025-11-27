import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const getPosts = async (communityId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const getPost = async (communityId, postId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const createPost = async (communityId, post) => {
    try {
        const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
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

const deletePost = async (communityId, postId) => {
    try {
        const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`, {
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

const upvotePost = async (communityId, postId) => {
    try {
        const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/upvote`, {
            method: "POST",
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

const downvotePost = async (communityId, postId) => {
    try {
        const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/downvote`, {
            method: "POST",
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

const getHomepagePosts = async () => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/homepage`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

export { getPosts, getPost, createPost, deletePost, upvotePost, downvotePost, getHomepagePosts };
