<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let todoState = useTodoState();

    let name = $state("");

    const addTodo = async (event) => {
        event.preventDefault();
        if (!name.trim()) return;

        const todo = {
            name: name.trim(),
        };

        await todoState.addTodo(todo);
        name = "";
    };
</script>

<form onsubmit={addTodo} class="add">
    <label>
        Todo name
        <input type="text" bind:value={name} required />
    </label>
    <button type="submit">Add Todo</button>
</form>

<style>
    .add {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
        align-items: flex-end;
    }
    label {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    input {
        padding: 0.4rem 0.5rem;
    }
    button {
        padding: 0.45rem 0.75rem;
        cursor: pointer;
    }
</style>
