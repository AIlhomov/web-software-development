<script>
    // If heading=true, render the task name as the main page heading.
    let { task, todoId, heading = false } = $props();
</script>

{#if heading}
    <h1>{task.name}</h1>
{:else}
    <div class="task">
        <a href={`/todos/${todoId}/tasks/${task.id}`}>{task.name}</a>
    </div>
{/if}

<style>
    .task {
        padding: 0.25rem 0;
    }
    a {
        text-decoration: none;
    }
</style>
