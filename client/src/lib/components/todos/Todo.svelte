<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    let { todoId } = $props();
</script>

<h1>Todo {todoId}</h1>

<TaskList {todoId} />
