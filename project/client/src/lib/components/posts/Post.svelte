<script>
    let { communityId, postId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    const postState = usePostState();

    let post = $derived(postState.getPost(communityId, postId));
</script>

{#if !post}
    <p>Loading...</p>
{:else}
    <h1>{post.title}</h1>
    <p>{post.content}</p>
{/if}
