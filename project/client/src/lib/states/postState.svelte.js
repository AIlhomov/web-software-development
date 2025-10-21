import { getPosts, getPost, createPost, deletePost } from "$lib/apis/postsApi.js";

// Shape: { [communityId:number]: [{ id:number, title:string, content:string, community_id:number, parent_post_id:null, created_at:string }] }
let postState = $state({});

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        getPosts: (communityId) => {
            const cid = Number(communityId);
            return postState[cid] ?? [];
        },
        loadPosts: async (communityId) => {
            const cid = Number(communityId);
            const response = await getPosts(cid);
            if (response.error) {
                console.error("Failed to load posts:", response.error);
                postState[cid] = [];
                return;
            }
            postState[cid] = response.data;
        },
        loadPost: async (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const response = await getPost(cid, pid);

            if (response.error) {
                console.error("Failed to load post:", response.error);
                return null;
            }

            const post = response.data;

            if (!postState[cid]) {
                postState[cid] = [];
            }

            const index = postState[cid].findIndex((p) => p.id === post.id);
            if (index >= 0) {
                postState[cid][index] = post;
            } else {
                postState[cid].push(post);
            }
            return post;
        },
        addPost: async (communityId, title, content) => {
            const cid = Number(communityId);
            const t = (title ?? "").toString().trim();
            const c = (content ?? "").toString().trim();
            if (!t || !c) return;

            const response = await createPost(cid, { title: t, content: c });

            if (response.error) {
                console.error("Failed to create post:", response.error);
                return;
            }

            const created = response.data;

            if (!postState[cid]) postState[cid] = [];
            postState[cid].push(created);
        },
        removePost: async (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            if (!postState[cid]) return;

            const response = await deletePost(cid, pid);
            if (response.error) {
                console.error("Failed to delete post:", response.error);
                return;
            }
            postState[cid] = postState[cid].filter((p) => p.id !== pid);
        },
        getPost: (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const list = postState[cid] ?? [];
            return list.find((p) => p.id === pid);
        }
    };
};

export { usePostState };
