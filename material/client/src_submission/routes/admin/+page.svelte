<script>
    import { onMount } from "svelte";
    import { authFetch } from "$lib/utils/fetchUtils.js";
    import { PUBLIC_API_URL } from "$env/static/public";

    let stats = $state(null);

    onMount(async () => {
        const response = await authFetch(`${PUBLIC_API_URL}/api/admin/stats`);
        stats = await response.json();
    });
</script>

{#if stats}
    <p>Todos: {stats.todos}, tasks: {stats.tasks}</p>
{/if}
