<script>
    import TodoList from "$lib/components/todos/TodoList.svelte";
    import TodoForm from "$lib/components/todos/TodoForm.svelte";
</script>

<h1>Todos</h1>
<TodoList />
<TodoForm />

<style>
    h1 {
        margin-bottom: 0.25rem;
    }
</style>
