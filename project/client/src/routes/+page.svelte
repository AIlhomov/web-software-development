<script>
    import { onMount } from "svelte";
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";
    import HomePageList from "$lib/components/homePage/HomePageList.svelte";
    
    const homePageState = useHomePageState();
    
    onMount(async () => {
        await homePageState.loadPosts();
    });
</script>

<h1>Welcome to the home page!</h1>
<h2>Recent Posts (Last 3 Days)</h2>

<HomePageList />

<style>
    h1 {
        text-align: center;
        margin-top: 4rem;
    }
    
    p {
        text-align: center;
        margin-top: 2rem;
    }
    
    a {
        color: #0066cc;
        text-decoration: none;
        font-size: 1.1rem;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>
