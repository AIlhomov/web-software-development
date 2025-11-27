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

<div class="space-y-8">
  <h1 class="text-4xl font-bold text-gray-900">Communities</h1>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <CommunityList />
    </div>
    <div>
      <CommunityForm />
    </div>
  </div>
</div>
