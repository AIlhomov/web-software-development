<script>
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";

    let { data } = $props();
    const communityId = Number(data.communityId);
</script>

<a href="/communities">← Back to all communities</a>

<Community {communityId} />

<h2>Posts</h2>
<PostList {communityId} />
<AddPost {communityId} />
