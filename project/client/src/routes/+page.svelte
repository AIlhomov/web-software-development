<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const authState = useAuthState();
</script>

<h1>Welcome to the home page!</h1>

{#if authState.isAuthenticated}
    <p><a href="/communities">Go to communities</a></p>
{/if}

<style>
    h1 {
        text-align: center;
        margin-top: 4rem;
    }
    
    p {
        text-align: center;
        margin-top: 2rem;
    }
    
    a {
        color: #0066cc;
        text-decoration: none;
        font-size: 1.1rem;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>
