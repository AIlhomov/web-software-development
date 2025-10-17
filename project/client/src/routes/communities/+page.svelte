<script>
  import CommunityList from "$lib/components/communities/CommunityList.svelte";
  import CommunityForm from "$lib/components/communities/CommunityForm.svelte";
  import { useCommunityState } from "$lib/states/communityState.svelte.js";
  import { onMount } from "svelte";

  const communityState = useCommunityState();

  onMount(async () => {
    await communityState.loadCommunities();
  });
</script>

<h1>Communities</h1>

<CommunityList />
<CommunityForm />
