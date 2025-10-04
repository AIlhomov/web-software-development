<script>
    import Todo from "$lib/components/todos/Todo.svelte";
    let { data } = $props();
    const todoId = data.todoId;
    console.log(todoId);
</script>

<Todo {todoId} />
