<script>
    import Post from "$lib/components/posts/Post.svelte";
    import { usePostState } from "$lib/states/postState.svelte.js";

    let { data } = $props();
    const communityId = Number(data.communityId);
    const postId = Number(data.postId);

    const postState = usePostState();

    // Load the post from API when component mounts or postId changes
    $effect(() => {
        const loadData = async () => {
            try {
                // First check if post is already in state
                const existingPost = postState.getPost(communityId, postId);
                if (!existingPost) {
                    // Otherwise fetch from API
                    await postState.loadPost(communityId, postId);
                }
            } catch (error) {
                console.error("Failed to load post:", error);
            }
        };
        loadData();
    });
</script>

<a href={`/communities/${communityId}`}>← Back to community</a>

<Post {communityId} {postId} />
