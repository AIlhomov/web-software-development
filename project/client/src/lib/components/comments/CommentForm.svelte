<script>
    let { communityId, postId } = $props();

    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const commentState = useCommentState();
    const authState = useAuthState();

    const addComment = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get("content");

        await commentState.addComment(communityId, postId, content);

        event.target.reset();
    };
</script>

{#if authState.isAuthenticated}
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Add Comment</h3>
        <form onsubmit={addComment} class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Comment content
                </label>
                <textarea
                    name="content"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your comment"
                    rows="4"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Add comment
            </button>
        </form>
    </div>
{/if}
