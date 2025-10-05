<script>
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    export let todoId; // required to know which todo to add the task to

    const { addTask } = useTaskState();

    let taskName = "";

    function handleAdd() {
        const name = taskName.trim();
        if (!name) return;
        addTask(todoId, name);
        taskName = ""; // clear input
    }
</script>

<input
    type="text"
    bind:value={taskName}
    placeholder="Task name"
    on:keydown={(e) => e.key === "Enter" && handleAdd()}
/>
<button on:click={handleAdd}>Add Task</button>
