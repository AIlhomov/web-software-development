<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    let taskState = useTaskState();

    let name = $state("");

    const add = () => {
        if (!name.trim()) return;
        taskState.addTask(todoId, name.trim());
        name = "";
    };
</script>

<div class="add">
    <input
        type="text"
        bind:value={name}
        placeholder="New task name"
        aria-label="New task name"
    />
    <button onclick={add}>Add Task</button>
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
