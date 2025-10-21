import { PUBLIC_API_URL } from "$env/static/public";

const getComments = async (communityId, postId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`);
        if (!response.ok) {
            return { data: null, error: response.statusText };
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

const createComment = async (communityId, postId, comment) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
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

const deleteComment = async (communityId, postId, commentId) => {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}`, {
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

export { getComments, createComment, deleteComment };
