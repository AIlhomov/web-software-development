<script>
    import Post from "$lib/components/posts/Post.svelte";

    let { data } = $props();
    const communityId = Number(data.communityId);
    const postId = Number(data.postId);
</script>

<a href={`/communities/${communityId}`}>← Back to community</a>

<Post {communityId} {postId} />
