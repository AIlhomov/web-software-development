<script>
    import Post from "$lib/components/posts/Post.svelte";
    let { data } = $props();
    const communityId = Number(data.communityId);
    const postId = Number(data.postId);
</script>

<Post {communityId} {postId} />
