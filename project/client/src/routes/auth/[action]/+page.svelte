<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";

    let { data } = $props();
    let message = $state("");
    let errorMessage = $state("");
    let isLoading = $state(false);

    const authState = useAuthState();

    const handleForm = async (e) => {
        e.preventDefault();
        errorMessage = "";
        message = "";
        isLoading = true;

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            if (data.action === "login") {
                const result = await authState.login(email, password);
                if (result.success) {
                    message = "Login successful! Redirecting...";
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else {
                    errorMessage = result.error || "Login failed";
                    isLoading = false;
                }
            } else {
                const result = await authState.register(email, password);
                if (result.success) {
                    message = "Registration successful! You can now log in.";
                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 1000);
                } else {
                    errorMessage = result.error || "Registration failed";
                    isLoading = false;
                }
            }
        } catch (error) {
            errorMessage = error.message;
            isLoading = false;
        }
    };
</script>

<div class="max-w-md mx-auto mt-8">
    <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">
            {data.action === "login" ? "Login" : "Register"}
        </h2>

        {#if message}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>{message}</p>
            </div>
        {/if}

        {#if errorMessage}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{errorMessage}</p>
            </div>
        {/if}

        <form onsubmit={handleForm} class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@example.com"
                    required
                />
            </div>
            
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                />
            </div>
            
            <button 
                type="submit" 
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={isLoading}>
                {isLoading
                    ? "Please wait..."
                    : data.action === "login"
                      ? "Login"
                      : "Register"}
            </button>
        </form>

        <div class="text-center mt-6">
            {#if data.action === "login"}
                <p class="text-gray-600">
                    Don't have an account? <a href="/auth/register" class="text-blue-600 hover:text-blue-800 font-medium">Register here</a>
                </p>
            {:else}
                <p class="text-gray-600">
                    Already have an account? <a href="/auth/login" class="text-blue-600 hover:text-blue-800 font-medium">Login here</a>
                </p>
            {/if}
        </div>
    </div>
</div>
