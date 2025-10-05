<script>
    let { communityId } = $props();

    import { usePostState } from "$lib/states/postState.svelte.js";
    const postState = usePostState();

    // derive current community's posts
    let list = $derived(postState.getPosts(communityId));

    const remove = (id) => postState.removePost(communityId, id);
</script>

{#if list.length === 0}
    <p>No posts yet.</p>
{/if}

<ul>
    {#each list as post (post.id)}
        <li>
            <h3>
                <a href={`/communities/${communityId}/posts/${post.id}`}
                    >{post.title}</a
                >
            </h3>
            <p>{post.content}</p>
            <button onclick={() => remove(post.id)}>Remove</button>
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0.75rem 0;
    }
    li {
        margin: 0.5rem 0 1rem;
    }
    h3 {
        margin: 0 0 0.25rem;
    }
    a {
        text-decoration: none;
    }
    button {
        margin-top: 0.25rem;
    }
</style>
