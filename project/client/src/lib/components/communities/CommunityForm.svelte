<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    
    const communityState = useCommunityState();
    const authState = useAuthState();

    const addCommunity = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get("name");
        const description = formData.get("description");

        await communityState.addCommunity(name, description);

        event.target.reset();
    };
</script>

{#if authState.isAuthenticated}
<form onsubmit={addCommunity}>
    <input type="text" name="name" placeholder="Community name" required />
    <textarea name="description" placeholder="Community description" required
    ></textarea>
    <button type="submit">Add community</button>
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
