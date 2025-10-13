<script>
    import { initLikes } from "$lib/states/likesState.svelte.js";
    import Likes from "$lib/components/Likes.svelte";
    let { data } = $props();

    $effect(() => {
        initLikes(data.resourceId);
    });
</script>

<Likes resourceId={data.resourceId} />
