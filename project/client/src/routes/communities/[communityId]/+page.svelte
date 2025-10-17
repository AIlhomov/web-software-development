<script>
    import Community from "$lib/components/communities/Community.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";
    import PostForm from "$lib/components/posts/PostForm.svelte";
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { usePostState } from "$lib/states/postState.svelte.js";

    let { data } = $props();
    const communityId = Number(data.communityId);

    const communityState = useCommunityState();
    const postState = usePostState();

    // Load the community and posts from API when component mounts or communityId changes
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

                // Load posts for this community
                await postState.loadPosts(communityId);
            } catch (error) {
                console.error("Failed to load community or posts:", error);
            }
        };
        loadData();
    });
</script>

<a href="/communities">← Back to all communities</a>

<Community {communityId} />

<h2>Posts</h2>
<PostList {communityId} />
<PostForm {communityId} />
