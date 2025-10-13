<script>
    import { useLikesState } from "$lib/states/likesState.svelte.js";
    let { resourceId } = $props();

    let likesState = useLikesState();

    const handleLike = async () => {
        await likesState.incrementLikes(resourceId);
    };
</script>

<p>Likes for {resourceId}: {likesState.likes[resourceId] ?? 0}</p>
<button onclick={handleLike}>Like</button>
