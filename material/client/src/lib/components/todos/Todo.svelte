<script>
    // If heading=true, render the todo name as the main page heading.
    let { todo, heading = false } = $props();
</script>

{#if heading}
    <h1>{todo.name}</h1>
{:else}
    <div class="todo">
        <a href={`/todos/${todo.id}`}>{todo.name}</a>
    </div>
{/if}

<style>
    .todo {
        padding: 0.25rem 0;
    }
    a {
        text-decoration: none;
    }
</style>
