<script>
    import TodoList from "$lib/components/todos/TodoList.svelte";
    import AddTodo from "$lib/components/todos/AddTodo.svelte";
</script>

<h1>Todos</h1>
<TodoList />
<AddTodo />

<style>
    h1 {
        margin-bottom: 0.25rem;
    }
</style>
