<script>
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    export let todoId;
    const { tasks } = useTaskState();
</script>

<h2>Tasks</h2>
{#if !(tasks[todoId] && tasks[todoId].length)}
    <p>No tasks yet.</p>
{/if}
<ul>
    {#each tasks[todoId] || [] as task (task.id)}
        <li>{task.name}</li>
    {/each}
</ul>
