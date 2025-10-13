<script>
    import { useBeanState } from "$lib/states/beanState.svelte.js";
    const beansState = useBeanState();

    const remove = async (beanId) => {
        await beansState.remove(beanId);
    };
</script>

<ul>
    {#each beansState.beans as b}
        <li>
            <strong>{b.name}</strong> ({b.roast})
            <button onclick={() => remove(b.id)}>Delete</button>
        </li>
    {/each}
</ul>
