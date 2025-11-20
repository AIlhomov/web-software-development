<script>
    let { communityId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const postState = usePostState();
    const authState = useAuthState();

    const addPost = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get("title");
        const content = formData.get("content");

        await postState.addPost(communityId, title, content);

        event.target.reset();
    };
</script>

{#if authState.isAuthenticated}
    <form onsubmit={addPost}>
        <input type="text" name="title" placeholder="Post title" required />
        <textarea name="content" placeholder="Post content" required></textarea>
        <button type="submit">Add post</button>
    </form>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
        max-width: 600px;
    }
    input,
    textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    textarea {
        min-height: 80px;
        resize: vertical;
    }
    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        align-self: flex-start;
    }
</style>
