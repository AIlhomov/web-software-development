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
    <nav class="main-nav">
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/communities">Communities</a>
        </div>
        <div class="user-section">
            {#if authState.isAuthenticated}
                <span>Hello, {authState.user.email}!</span>
                <button onclick={handleLogout}>Logout</button>
            {:else}
                <span>Hello anonymous!</span>
                <a href="/auth/login">Login</a>
                <a href="/auth/register">Register</a>
            {/if}
        </div>
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

    .main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    .nav-links {
        display: flex;
        gap: 1.5rem;
    }

    .nav-links a {
        font-weight: 600;
        font-size: 1.1rem;
    }

    .user-section {
        display: flex;
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
        max-width: 1200px;
        margin: 0 auto;
    }
</style>
