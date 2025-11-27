<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const state = useCommunityState();
    const authState = useAuthState();

    const remove = async (id) => {
        await state.removeCommunity(id);
    };
</script>

{#if state.communities.length === 0}
    <p class="text-gray-600">No communities yet.</p>
{/if}

<ul class="space-y-4 list-none p-0">
    {#each state.communities as c (c.id)}
        <li
            class="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
        >
            <h2 class="text-xl font-bold mb-2">
                <a
                    href={`/communities/${c.id}`}
                    class="text-blue-600 hover:text-blue-800">{c.name}</a
                >
            </h2>
            <p class="text-gray-700 mb-3">{c.description}</p>
            {#if authState.user && c.created_by === authState.user.id}
                <button
                    onclick={() => remove(c.id)}
                    class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                >
                    Remove
                </button>
            {/if}
        </li>
    {/each}
</ul>
