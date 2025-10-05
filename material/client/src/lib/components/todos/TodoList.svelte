<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    import Todo from "./Todo.svelte";

    let todoState = useTodoState();
    let taskState = useTaskState();

    const remove = (id) => {
        // remove the todo and any tasks that belong to it
        todoState.removeTodo(id);
        taskState.removeAllForTodo(id);
    };
</script>

{#if todoState.todos.length === 0}
    <p>No todos yet.</p>
{/if}
<ul>
    {#each todoState.todos as todo (todo.id)}
        <li style="display:flex;gap:.5rem;align-items:center">
            <Todo {todo} />
            <button onclick={() => remove(todo.id)}>Remove</button>
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
</style>
