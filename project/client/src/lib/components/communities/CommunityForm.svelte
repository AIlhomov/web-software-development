<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const communityState = useCommunityState();
    const authState = useAuthState();

    const addCommunity = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get("name");
        const description = formData.get("description");

        await communityState.addCommunity(name, description);

        event.target.reset();
    };
</script>

{#if authState.isAuthenticated}
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Add New Community</h3>
        <form onsubmit={addCommunity} class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Community name
                </label>
                <input
                    type="text"
                    name="name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter community name"
                    required
                />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Community description
                </label>
                <textarea
                    name="description"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter community description"
                    rows="4"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Add community
            </button>
        </form>
    </div>
{/if}
