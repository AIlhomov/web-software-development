<script>
    import Post from "$lib/components/posts/Post.svelte";
    import CommentForm from "$lib/components/comments/CommentForm.svelte";
    import CommentList from "$lib/components/comments/CommentList.svelte";
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useCommentState } from "$lib/states/commentState.svelte.js";

    let { data } = $props();
    const communityId = Number(data.communityId);
    const postId = Number(data.postId);

    const postState = usePostState();
    const commentState = useCommentState();

    // Load the post and comments from API when component mounts or postId changes
    $effect(() => {
        const loadData = async () => {
            try {
                // First check if post is already in state
                const existingPost = postState.getPost(communityId, postId);
                if (!existingPost) {
                    // Otherwise fetch from API
                    await postState.loadPost(communityId, postId);
                }
                // Load comments for the post
                await commentState.loadComments(communityId, postId);
            } catch (error) {
                console.error("Failed to load post or comments:", error);
            }
        };
        loadData();
    });
</script>

<a href={`/communities/${communityId}`}>← Back to community</a>

<Post {communityId} {postId} />

<h2>Comments</h2>
<CommentForm {communityId} {postId} />
<CommentList {communityId} {postId} />
