<script>
    import Community from "$lib/components/communities/Community.svelte";
    let { data } = $props();
    const communityId = Number(data.communityId);
</script>

<Community {communityId} />
