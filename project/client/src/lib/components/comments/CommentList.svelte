<script>
    let { communityId, postId } = $props();

    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const commentState = useCommentState();
    const authState = useAuthState();

    // derive current post's comments
    let list = $derived(commentState.getComments(postId));

    const remove = async (id) => {
        await commentState.removeComment(communityId, postId, id);
    };

    const upvote = async (commentId) => {
        await commentState.upvoteComment(communityId, postId, commentId);
    };

    const downvote = async (commentId) => {
        await commentState.downvoteComment(communityId, postId, commentId);
    };
</script>

{#if list.length === 0}
    <p class="text-gray-600">No comments yet.</p>
{/if}

<ul class="space-y-3 list-none p-0">
    {#each list as comment (comment.id)}
        <li
            class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
            <p class="text-base text-gray-800 mb-2">{comment.content}</p>
            <p class="text-sm text-gray-500 mb-3">
                Comment created by user {comment.created_by}
            </p>
            <div class="flex gap-2 flex-wrap mb-3">
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                    ⬆️ Upvotes: {comment.upvotes ?? 0}
                </span>
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                >
                    ⬇️ Downvotes: {comment.downvotes ?? 0}
                </span>
            </div>
            <div class="flex gap-2 flex-wrap">
                {#if authState.user}
                    <button
                        onclick={() => upvote(comment.id)}
                        class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                        Upvote
                    </button>
                    <button
                        onclick={() => downvote(comment.id)}
                        class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        Downvote
                    </button>
                {/if}
                {#if authState.user && authState.user.id === comment.created_by}
                    <button
                        onclick={() => remove(comment.id)}
                        class="px-3 py-1.5 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm font-medium"
                    >
                        Remove
                    </button>
                {/if}
            </div>
        </li>
    {/each}
</ul>
