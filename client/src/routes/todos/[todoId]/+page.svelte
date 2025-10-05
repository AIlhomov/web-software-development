<script>
    import Todo from "$lib/components/todos/Todo.svelte";
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import AddTask from "$lib/components/todos/AddTask.svelte";
    let { data } = $props();
    const todoId = data.todoId;
</script>

<Todo {todoId} />
