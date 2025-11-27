<script>
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";

    const homePageState = useHomePageState();
    let posts = $derived(homePageState.posts);
</script>

{#if posts.length === 0}
    <p class="text-lg text-gray-600 text-center">No recent posts.</p>
{/if}

<ul class="space-y-4 list-none p-0">
    {#each posts as post (post.id)}
        <li
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
            <a
                href={`/communities/${post.community_id}/posts/${post.id}`}
                class="text-2xl font-bold text-blue-600 hover:text-blue-800 no-underline block mb-3"
            >
                {post.title}
            </a>
            <p class="text-gray-700 mb-4">{post.content}</p>
            <div class="flex gap-3 flex-wrap">
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                    ⬆️ Upvotes: {post.upvotes ?? 0}
                </span>
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                >
                    ⬇️ Downvotes: {post.downvotes ?? 0}
                </span>
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                    💬 Comments: {post.comments ?? 0}
                </span>
            </div>
        </li>
    {/each}
</ul>
