<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    import Task from "./Task.svelte";
    let taskState = useTaskState();

    // RUNES MODE
    let list = $derived(taskState.tasks[todoId] ?? []);

    const remove = async (taskId) => {
        await taskState.removeTask(todoId, taskId);
    };

    const toggleDone = async (taskId) => {
        await taskState.toggleTaskDone(todoId, taskId);
    };
</script>

{#if list.length === 0}
    <p>No tasks yet.</p>
{/if}
<ul>
    {#each list as task (task.id)}
        <li style="display:flex;gap:.5rem;align-items:center">
            {#if task.is_done}
                <div class="task">
                    <s>{task.name}</s>
                </div>
            {:else}
                <Task {task} {todoId} />
            {/if}
            <button onclick={() => toggleDone(task.id)}>
                {task.is_done ? "Mark not done" : "Mark done"}
            </button>
            <button onclick={() => remove(task.id)}>Remove</button>
        </li>
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
    .task {
        padding: 0.25rem 0;
    }
</style>
