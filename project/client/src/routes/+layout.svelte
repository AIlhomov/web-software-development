<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    import { goto } from "$app/navigation";

    const authState = useAuthState();

    function handleLogout() {
        authState.logout();
        goto("/");
    }
</script>

<header>
    <nav>
        {#if authState.isAuthenticated}
            <span>Hello, {authState.user.email}!</span>
            <button onclick={handleLogout}>Logout</button>
        {:else}
            <span>Hello anonymous!</span>
            <a href="/auth/login">Login</a>
            <a href="/auth/register">Register</a>
        {/if}
    </nav>
</header>

<main>
    <slot />
</main>

<style>
    header {
        background-color: #f0f0f0;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
    }

    nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
    }

    a {
        color: #0066cc;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #cc0000;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #990000;
    }

    main {
        padding: 2rem;
    }
</style>
