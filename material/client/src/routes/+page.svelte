<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    import { authFetch } from "$lib/utils/fetchUtils.js";
    import { PUBLIC_API_URL } from "$env/static/public";

    const authState = useAuthState();
    let message = $state("");

    const fetchData = async () => {
        try {
            const response = await authFetch(`${PUBLIC_API_URL}/api/secret`);
            const data = await response.json();
            message = data.message;
        } catch (error) {
            console.error("Failed to fetch protected data:", error);
        }
    };
</script>

{#if authState.user}
    <button onclick={fetchData}>Fetch Protected Data</button>
    {#if message}
        <p>{message}</p>
    {/if}
{:else}
    <p>Hello anonymous!</p>
{/if}
