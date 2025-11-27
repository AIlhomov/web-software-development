<script>
    let { communityId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const postState = usePostState();
    const authState = useAuthState();

    const addPost = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get("title");
        const content = formData.get("content");

        await postState.addPost(communityId, title, content);

        event.target.reset();
    };
</script>

{#if authState.isAuthenticated}
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Create New Post</h3>
        <form onsubmit={addPost} class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Post title
                </label>
                <input 
                    type="text" 
                    name="title" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter post title" 
                    required />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Post content
                </label>
                <textarea 
                    name="content" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter post content" 
                    rows="4" 
                    required></textarea>
            </div>
            <button 
                type="submit" 
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add post
            </button>
        </form>
    </div>
{/if}
