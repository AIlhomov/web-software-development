<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    const state = useCommunityState();

    const remove = (id) => state.removeCommunity(id);
</script>

{#if state.communities.length === 0}
    <p>No communities yet.</p>
{/if}

<ul>
    {#each state.communities as c (c.id)}
        <li>
            <h2><a href={`/communities/${c.id}`}>{c.name}</a></h2>
            <p>{c.description}</p>
            <button onclick={() => remove(c.id)}>Remove</button>
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
    }
    h2 {
        margin: 0 0 0.25rem;
    }
    a {
        text-decoration: none;
    }
    button {
        margin-top: 0.25rem;
    }
</style>
