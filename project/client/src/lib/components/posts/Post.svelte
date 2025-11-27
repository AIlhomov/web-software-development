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
    <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-600">Loading...</p>
    </div>
{:else}
    <div class="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-6">
        <h1 class="text-4xl font-bold mb-3">{post.title}</h1>
        <p class="text-lg opacity-95">{post.content}</p>
    </div>
{/if}
