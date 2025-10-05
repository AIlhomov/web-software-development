<script>
    let { task, todoId } = $props();
</script>

<div class="task">
    <a href={`/todos/${todoId}/tasks/${task.id}`}>{task.name}</a>
</div>

<style>
    .task {
        padding: 0.25rem 0;
    }
    a {
        text-decoration: none;
    }
</style>
