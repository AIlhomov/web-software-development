import { getComments, createComment, deleteComment, upvoteComment, downvoteComment } from "$lib/apis/commentsApi.js";

// Shape: { [postId:number]: [{ id:number, title:null, content:string, community_id:number, parent_post_id:number, created_at:string }] }
let commentState = $state({});

const useCommentState = () => {
    return {
        get comments() {
            return commentState;
        },
        getComments: (postId) => {
            const pid = Number(postId);
            return commentState[pid] ?? [];
        },
        loadComments: async (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const response = await getComments(cid, pid);
            if (response.error) {
                console.error("Failed to load comments:", response.error);
                commentState[pid] = [];
                return;
            }
            commentState[pid] = response.data;
        },
        addComment: async (communityId, postId, content) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const c = (content ?? "").toString().trim();
            if (!c) return;

            const response = await createComment(cid, pid, { content: c });
            if (response.error) {
                console.error("Failed to create comment:", response.error);
                return;
            }

            if (!commentState[pid]) commentState[pid] = [];
            commentState[pid].push(response.data);
        },
        removeComment: async (communityId, postId, commentId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const cmtId = Number(commentId);
            if (!commentState[pid]) return;

            const response = await deleteComment(cid, pid, cmtId);
            if (response.error) {
                console.error("Failed to delete comment:", response.error);
                return;
            }
            commentState[pid] = commentState[pid].filter((c) => c.id !== cmtId);
        },
        upvoteComment: async (communityId, postId, commentId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const cmtId = Number(commentId);

            const response = await upvoteComment(cid, pid, cmtId);
            if (response.error) {
                console.error("Failed to upvote comment:", response.error);
                return;
            }

            const updatedComment = response.data;

            if (commentState[pid]) {
                const index = commentState[pid].findIndex((c) => c.id === cmtId);
                if (index >= 0) {
                    commentState[pid][index] = updatedComment;
                }
            }
        },
        downvoteComment: async (communityId, postId, commentId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const cmtId = Number(commentId);

            const response = await downvoteComment(cid, pid, cmtId);
            if (response.error) {
                console.error("Failed to downvote comment:", response.error);
                return;
            }

            const updatedComment = response.data;

            if (commentState[pid]) {
                const index = commentState[pid].findIndex((c) => c.id === cmtId);
                if (index >= 0) {
                    commentState[pid][index] = updatedComment;
                }
            }
        }
    };
};

export { useCommentState };
