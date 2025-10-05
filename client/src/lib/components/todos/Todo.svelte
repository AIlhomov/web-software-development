<script>
    let { todo } = $props();
</script>

<div class="todo">
    <a href={`/todos/${todo.id}`}>{todo.name}</a>
</div>

<style>
    .todo {
        padding: 0.25rem 0;
    }
    a {
        text-decoration: none;
    }
</style>
