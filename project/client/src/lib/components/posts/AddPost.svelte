<script>
    let { communityId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    const postState = usePostState();

    let title = $state("");
    let content = $state("");

    const add = () => {
        postState.addPost(communityId, title, content);
        title = "";
        content = "";
    };

    const onKey = (e) => {
        if (e.key === "Enter") add();
    };
</script>

<div class="add">
    <input
        type="text"
        placeholder="Post title"
        bind:value={title}
        onkeydown={onKey}
        aria-label="Post title"
    />
    <input
        type="text"
        placeholder="Post content"
        bind:value={content}
        onkeydown={onKey}
        aria-label="Post content"
    />
    <button onclick={add}>Add Post</button>
</div>

<style>
    .add {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    input {
        padding: 0.4rem 0.5rem;
    }
    button {
        padding: 0.45rem 0.75rem;
    }
</style>
