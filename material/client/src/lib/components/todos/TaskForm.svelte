<script>
    let { todoId } = $props();
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    let taskState = useTaskState();

    let description = $state("");
    let isDone = $state(false);

    const addTask = (event) => {
        event.preventDefault();
        if (!description.trim()) return;

        const task = {
            description: description.trim(),
            is_done: isDone,
        };

        taskState.addTask(todoId, task);
        description = "";
        isDone = false;
    };
</script>

<form onsubmit={addTask} class="add">
    <label>
        Task description
        <input type="text" bind:value={description} required />
    </label>
    <label class="checkbox-label">
        <input type="checkbox" bind:checked={isDone} />
        Is done
    </label>
    <button type="submit">Add Task</button>
</form>

<style>
    .add {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
        align-items: flex-end;
    }
    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    label:first-child {
        flex: 1;
    }
    .checkbox-label {
        flex-direction: row;
        align-items: center;
    }
    input[type="text"] {
        padding: 0.4rem 0.5rem;
    }
    input[type="checkbox"] {
        margin-right: 0.25rem;
    }
    button {
        padding: 0.45rem 0.75rem;
        cursor: pointer;
    }
</style>
