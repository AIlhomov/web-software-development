<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    const communityState = useCommunityState();

    let name = $state("");
    let description = $state("");

    const add = () => {
        communityState.addCommunity(name, description);
        name = "";
        description = "";
    };

    const onKey = (e) => {
        if (e.key === "Enter") add();
    };
</script>

<div class="add">
    <input
        type="text"
        placeholder="Community name"
        bind:value={name}
        onkeydown={onKey}
        aria-label="Community name"
    />
    <input
        type="text"
        placeholder="Community description"
        bind:value={description}
        onkeydown={onKey}
        aria-label="Community description"
    />
    <button onclick={add}>Add community</button>
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
