<script>
    let { communityId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const postState = usePostState();
    const authState = useAuthState();

    // derive current community's posts
    let list = $derived(postState.posts[communityId] ?? []);
    //let list = $derived(postState.getPosts(communityId));

    const remove = async (id) => {
        await postState.removePost(communityId, id);
    };

    const upvote = async (postId) => {
        await postState.upvotePost(communityId, postId);
    };

    const downvote = async (postId) => {
        await postState.downvotePost(communityId, postId);
    };
</script>

{#if list.length === 0}
    <p class="text-gray-600">No posts yet.</p>
{/if}

<ul class="space-y-4 list-none p-0">
    {#each list as post (post.id)}
        <li class="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
            <a href={`/communities/${communityId}/posts/${post.id}`} class="text-xl font-bold text-blue-600 hover:text-blue-800 no-underline block mb-2">
                {post.title}
            </a>
            <p class="text-gray-700 mb-2">{post.content}</p>
            <p class="text-sm text-gray-500 mb-3">Post created by user {post.created_by}</p>
            <div class="flex gap-2 flex-wrap mb-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ⬆️ Upvotes: {post.upvotes ?? 0}
                </span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    ⬇️ Downvotes: {post.downvotes ?? 0}
                </span>
            </div>
            <div class="flex gap-2 flex-wrap">
                {#if authState.user}
                    <button 
                        onclick={() => upvote(post.id)} 
                        class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium">
                        Upvote
                    </button>
                    <button 
                        onclick={() => downvote(post.id)} 
                        class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
                        Downvote
                    </button>
                {/if}
                {#if authState.user && authState.user.id === post.created_by}
                    <button 
                        onclick={() => remove(post.id)} 
                        class="px-3 py-1.5 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm font-medium">
                        Remove
                    </button>
                {/if}
            </div>
        </li>
    {/each}
</ul>
