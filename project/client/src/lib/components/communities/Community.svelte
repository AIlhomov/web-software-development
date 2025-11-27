<script>
    let { communityId } = $props();

    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    const state = useCommunityState();

    // derive the community; may be undefined immediately on first render (SSR/hydration)
    let community = $derived(state.getOne(communityId));
</script>

{#if !community}
    <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-600">Loading...</p>
    </div>
{:else}
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-6">
        <h1 class="text-4xl font-bold mb-2">{community.name}</h1>
        <p class="text-lg opacity-95">{community.description}</p>
    </div>
{/if}
