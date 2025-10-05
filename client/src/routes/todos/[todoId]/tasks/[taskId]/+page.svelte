<script>
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    import Task from "$lib/components/todos/Task.svelte";

    let { data } = $props();
    let todoId = Number(data.todoId);
    let taskId = Number(data.taskId);

    const taskState = useTaskState();
    let list = $derived(taskState.tasks[todoId] ?? []);
    let task = $derived(list.find((t) => t.id === taskId));
</script>

<a href={`/todos/${todoId}`}>← Back to Todo {todoId}</a>

{#if task}
    <Task {task} {todoId} heading={true} />
{:else}
    <h1>Task {taskId}</h1>
{/if}

<style>
    a {
        text-decoration: none;
        display: inline-block;
        margin-bottom: 0.5rem;
    }
    h1 {
        margin-bottom: 0.25rem;
    }
</style>
