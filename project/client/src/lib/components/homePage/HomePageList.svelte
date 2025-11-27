<script>
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";
    
    const homePageState = useHomePageState();
    let posts = $derived(homePageState.posts);
</script>

{#if posts.length === 0}
    <p>No recent posts.</p>
{/if}

<ul>
    {#each posts as post (post.id)}
        <li>
            <a href={`/communities/${post.community_id}/posts/${post.id}`}>
                {post.title}
            </a>
            <p>{post.content}</p>
            <div class="stats">
                <span>Upvotes: {post.upvotes ?? 0}</span>
                <span>Downvotes: {post.downvotes ?? 0}</span>
                <span>Comments: {post.comments ?? 0}</span>
            </div>
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
    }
    
    li {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f9f9f9;
    }
    
    a {
        text-decoration: none;
        font-size: 1.3em;
        font-weight: bold;
        color: #0066cc;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    p {
        margin: 0.5rem 0;
        color: #333;
    }
    
    .stats {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
        font-size: 0.9em;
        color: #666;
    }
    
    .stats span {
        padding: 0.25rem 0.5rem;
        background-color: #e0e0e0;
        border-radius: 3px;
    }
</style>
