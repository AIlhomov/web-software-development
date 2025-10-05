<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import AddTask from "$lib/components/todos/AddTask.svelte";

    let { data } = $props();
    let todoId = parseInt(data.todoId); // ensure number (matches materials fix)
</script>

<a href="/todos">← Back to all todos</a>
<h1>Todo {todoId}</h1>

<TaskList {todoId} />
<AddTask {todoId} />

<style>
    a {
        text-decoration: none;
        display: inline-block;
        margin-bottom: 0.5rem;
    }
    h1 {
        margin-bottom: 0.25rem;
    }
</style>
