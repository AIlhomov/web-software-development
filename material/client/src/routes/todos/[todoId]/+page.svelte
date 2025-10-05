<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import AddTask from "$lib/components/todos/AddTask.svelte";
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    import Todo from "$lib/components/todos/Todo.svelte";

    let { data } = $props();
    let todoId = Number(data.todoId);

    const todoState = useTodoState();
    let todo = $derived(todoState.todos.find((t) => t.id === todoId));
</script>

<a href="/todos">← Back to all todos</a>

{#if todo}
    <Todo {todo} heading={true} />
{:else}
    <h1>Todo {todoId}</h1>
{/if}

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
