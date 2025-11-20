<script>
    let { communityId, postId } = $props();

    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const commentState = useCommentState();
    const authState = useAuthState();

    // derive current post's comments
    let list = $derived(commentState.getComments(postId));

    const remove = async (id) => {
        await commentState.removeComment(communityId, postId, id);
    };
</script>

{#if list.length === 0}
    <p>No comments yet.</p>
{/if}

<ul>
    {#each list as comment (comment.id)}
        <li>
            <p>{comment.content}</p>
            {#if authState.user && authState.user.id === comment.created_by}
                <button onclick={() => remove(comment.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0.75rem 0;
    }
    li {
        margin: 0.5rem 0 1rem;
        padding: 0.5rem;
        border: 1px solid #eee;
        border-radius: 4px;
    }
    p {
        margin: 0 0 0.5rem;
    }
    button {
        margin-top: 0.25rem;
    }
</style>
