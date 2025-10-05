<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let todoState = useTodoState();
    import Todo from "./Todo.svelte";
</script>

{#if todoState.todos.length === 0}
    <p>No todos yet.</p>
{/if}
<ul>
    {#each todoState.todos as todo (todo.id)}
        <li><Todo {todo} /></li>
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
