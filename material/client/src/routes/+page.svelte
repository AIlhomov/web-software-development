<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const authState = useAuthState();
</script>

{#if authState.user}
    <a href="/todos">Go to your todos</a>
{:else}
    <p>Hello anonymous!</p>
{/if}
