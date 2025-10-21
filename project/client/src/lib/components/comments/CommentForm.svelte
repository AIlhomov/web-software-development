<script>
    let { communityId, postId } = $props();

    import { useCommentState } from "$lib/states/commentState.svelte.js";
    const commentState = useCommentState();

    const addComment = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get("content");

        await commentState.addComment(communityId, postId, content);

        event.target.reset();
    };
</script>

<form onsubmit={addComment}>
    <textarea name="content" placeholder="Comment content" required></textarea>
    <button type="submit">Add comment</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
        max-width: 600px;
    }
    textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-height: 80px;
        resize: vertical;
    }
    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        align-self: flex-start;
    }
</style>
