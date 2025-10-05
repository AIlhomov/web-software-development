<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte.js";

    import Task from "./Task.svelte";
    let taskState = useTaskState();
    // RUNES MODE
    let list = $derived(taskState.tasks[todoId] ?? []);
</script>

{#if list.length === 0}
    <p>No tasks yet.</p>
{/if}
<ul>
    {#each list as task (task.id)}
        <li><Task {task} {todoId} /></li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0.5rem 0;
    }
    li {
        margin: 0.25rem 0;
    }
</style>
