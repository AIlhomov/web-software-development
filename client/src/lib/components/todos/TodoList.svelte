<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let todoState = useTodoState();
</script>

<ul>
    {#each todoState.todos as todo (todo.id)}
        <li>
            <a href={`/todos/${todo.id}`}>{todo.name}</a>
        </li>
    {/each}
</ul>
