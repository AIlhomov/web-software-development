<script>
    import '../app.css';
    import { useAuthState } from "$lib/states/authState.svelte.js";
    import { goto } from "$app/navigation";

    const authState = useAuthState();

    function handleLogout() {
        authState.logout();
        goto("/");
    }
</script>

<div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-md border-b border-gray-200">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex gap-6">
                    <a href="/" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                        <span>🏠</span>
                        <span>Home</span>
                    </a>
                    <a href="/communities" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                        <span>👥</span>
                        <span>Communities</span>
                    </a>
                </div>
                <div class="flex items-center gap-4">
                    {#if authState.isAuthenticated}
                        <span class="text-sm text-gray-700">Hello, <span class="font-semibold">{authState.user.email}</span>!</span>
                        <button 
                            onclick={handleLogout} 
                            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                            Logout
                        </button>
                    {:else}
                        <span class="text-sm text-gray-700">Hello anonymous!</span>
                        <a href="/auth/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Login</a>
                        <a href="/auth/register" class="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Register</a>
                    {/if}
                </div>
            </div>
        </nav>
    </header>

    <main class="container mx-auto px-6 py-8">
        <slot />
    </main>
</div>
