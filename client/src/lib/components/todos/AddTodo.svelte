<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let taskState = useTodoState();

    let todoName = $state("");

    const addTodo = () => {
        taskState.addTodo(todoName);
        todoName = "";
    };
</script>

<input type="text" bind:value={todoName} placeholder="Todo name" />
<button on:click={addTodo}>Add Todo</button>
