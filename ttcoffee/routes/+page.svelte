<script>
    import BeanList from "$lib/components/BeanList.svelte";
    import BeanForm from "$lib/components/BeanForm.svelte";
    import { useBeanState } from "$lib/states/beanState.svelte.js";
    import { onMount } from "svelte";

    const beansState = useBeanState();

    onMount(async () => {
        await beansState.load();
    });
</script>

<h1>Coffee Beans</h1>

<BeanList />

<h2>Add a bean</h2>

<BeanForm />
