<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let todoState = useTodoState();

    let name = $state("");

    const add = () => {
        if (!name.trim()) return;
        todoState.addTodo(name.trim());
        name = "";
    };
</script>

<div class="add">
    <input
        type="text"
        bind:value={name}
        placeholder="New todo name"
        aria-label="New todo name"
    />
    <button onclick={add}>Add Todo</button>
</div>

<style>
    .add {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }
    input {
        flex: 1;
        padding: 0.4rem 0.5rem;
    }
    button {
        padding: 0.45rem 0.75rem;
        cursor: pointer;
    }
</style>
