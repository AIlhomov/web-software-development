<script>
    import TodoList from "$lib/components/todos/TodoList.svelte";
    import TodoForm from "$lib/components/todos/TodoForm.svelte";
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    import { onMount } from "svelte";

    const todoState = useTodoState();

    onMount(async () => {
        await todoState.loadTodos();
    });
</script>

<h1>Todos</h1>
<TodoList />
<TodoForm />

<style>
    h1 {
        margin-bottom: 0.25rem;
    }
</style>
