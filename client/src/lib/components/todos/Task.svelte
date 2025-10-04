<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    let { todoId, taskId } = $props();
</script>

<TaskList {taskId} />
<h1>Todo {todoId}, task {taskId}</h1>
