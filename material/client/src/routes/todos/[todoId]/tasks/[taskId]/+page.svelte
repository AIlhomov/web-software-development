<script>
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    import Task from "$lib/components/todos/Task.svelte";

    let { data } = $props();
    let todoId = Number(data.todoId);
    let taskId = Number(data.taskId);

    const taskState = useTaskState();
    let task = $state(null);

    // Load the task from API when component mounts or taskId changes
    $effect(() => {
        const loadTask = async () => {
            try {
                // First check if task is already in state
                const list = taskState.tasks[todoId] ?? [];
                const existingTask = list.find((t) => t.id === taskId);
                if (existingTask) {
                    task = existingTask;
                } else {
                    // Otherwise fetch from API
                    task = await taskState.loadTask(todoId, taskId);
                }
            } catch (error) {
                console.error("Failed to load task:", error);
                task = null;
            }
        };
        loadTask();
    });
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
