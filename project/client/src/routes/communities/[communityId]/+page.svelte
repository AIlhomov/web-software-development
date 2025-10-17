<script>
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";
    import { useCommunityState } from "$lib/states/communityState.svelte.js";

    let { data } = $props();
    const communityId = Number(data.communityId);

    const communityState = useCommunityState();

    // Load the community from API when component mounts or communityId changes
    $effect(() => {
        const loadData = async () => {
            try {
                // First check if community is already in state
                const existingCommunity = communityState.communities.find(
                    (c) => c.id === communityId,
                );
                if (!existingCommunity) {
                    // Otherwise fetch from API
                    await communityState.loadCommunity(communityId);
                }
            } catch (error) {
                console.error("Failed to load community:", error);
            }
        };
        loadData();
    });
</script>

<a href="/communities">← Back to all communities</a>

<Community {communityId} />

<h2>Posts</h2>
<PostList {communityId} />
<AddPost {communityId} />
