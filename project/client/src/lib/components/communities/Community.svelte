<script>
    let { communityId } = $props();

    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    const state = useCommunityState();

    // derive the community; may be undefined immediately on first render (SSR/hydration)
    let community = $derived(state.getOne(communityId));
</script>

{#if !community}
    <p>Loading...</p>
{:else}
    <h1>{community.name}</h1>
    <p>{community.description}</p>
{/if}
