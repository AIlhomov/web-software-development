<script>
    import { onMount } from "svelte";
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";
    import HomePageList from "$lib/components/homePage/HomePageList.svelte";
    
    const homePageState = useHomePageState();
    
    onMount(async () => {
        await homePageState.loadPosts();
    });
</script>

<div class="space-y-8">
    <div class="text-center space-y-3">
        <h1 class="text-5xl font-bold text-gray-900">Welcome to the home page!</h1>
        <h2 class="text-3xl font-semibold text-gray-700">Recent Posts (Last 3 Days)</h2>
    </div>

    <HomePageList />
</div>
