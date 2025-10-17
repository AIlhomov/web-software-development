import { PUBLIC_API_URL } from "$env/static/public";

const getPosts = async (communityId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    return await response.json();
};

const getPost = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }
    return await response.json();
};

const createPost = async (communityId, post) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    return await response.json();
};

const deletePost = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete post");
    }
    return await response.json();
};

export { getPosts, getPost, createPost, deletePost };
