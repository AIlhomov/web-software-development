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

<div class="space-y-6">
    <a href={`/communities/${communityId}`} class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
        ← Back to community
    </a>

    <Post {communityId} {postId} />

    <div class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900">Comments</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
                <CommentList {communityId} {postId} />
            </div>
            <div>
                <CommentForm {communityId} {postId} />
            </div>
        </div>
    </div>
</div>
