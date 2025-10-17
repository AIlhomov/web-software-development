<script>
    let { communityId, postId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    const postState = usePostState();

    let post = $state(null);

    // Load the post from API when component mounts or postId changes
    $effect(() => {
        const loadPost = async () => {
            try {
                // First check if post is already in state
                const existingPost = postState.getPost(communityId, postId);
                if (existingPost) {
                    post = existingPost;
                } else {
                    // Otherwise fetch from API
                    post = await postState.loadPost(communityId, postId);
                }
            } catch (error) {
                console.error("Failed to load post:", error);
                post = null;
            }
        };
        loadPost();
    });
</script>

{#if !post}
    <p>Loading...</p>
{:else}
    <h1>{post.title}</h1>
    <p>{post.content}</p>
{/if}
