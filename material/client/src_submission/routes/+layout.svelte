<script>
  import "../app.css";
  import { useAuthState } from "$lib/states/authState.svelte.js";
  let { children } = $props();
  const authState = useAuthState();
</script>

<div class="flex flex-col h-full">
  <header class="bg-primary-100 p-4 mb-6 flex flex-col sm:flex-row sm:items-center">
    <span class="text-lg md:text-xl text-primary-900 mb-2 sm:mb-0">Todo App</span>
    <div class="sm:ml-4">
      {#if authState.user}
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span>
            Hello, {authState.user.email}!
            {#if authState.user.roles?.length}
              (Roles: {authState.user.roles.join(", ")})
            {/if}
          </span>
          {#if authState.user.roles?.includes("ADMIN")}
            <ul>
              <li><a href="/admin">Admin</a></li>
            </ul>
          {/if}
          <button class="btn btn-sm variant-filled-secondary" onclick={() => authState.logout()}>Logout</button>
        </div>
      {:else}
        <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <li><a class="anchor" href="/auth/login">Login</a></li>
          <li><a class="anchor" href="/auth/register">Register</a></li>
        </ul>
      {/if}
    </div>
  </header>

  <main class="container mx-auto max-w-2xl grow">
    {@render children()}
  </main>

  <footer class="p-4 border-t-2 border-gray-300">
    <p class="text-center">My Cool Todo Application</p>
  </footer>
</div>
