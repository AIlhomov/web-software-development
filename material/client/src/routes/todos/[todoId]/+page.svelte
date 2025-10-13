<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import TaskForm from "$lib/components/todos/TaskForm.svelte";
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    import Todo from "$lib/components/todos/Todo.svelte";

    let { data } = $props();
    let todoId = Number(data.todoId);

    const todoState = useTodoState();
    const taskState = useTaskState();
    let todo = $state(null);

    // Load the todo and tasks from API when component mounts or todoId changes
    $effect(() => {
        const loadData = async () => {
            try {
                // First check if todo is already in state
                const existingTodo = todoState.todos.find(
                    (t) => t.id === todoId,
                );
                if (existingTodo) {
                    todo = existingTodo;
                } else {
                    // Otherwise fetch from API
                    todo = await todoState.loadTodo(todoId);
                }

                // Load tasks for this todo
                await taskState.loadTasks(todoId);
            } catch (error) {
                console.error("Failed to load todo or tasks:", error);
                todo = null;
            }
        };
        loadData();
    });
</script>

<a href="/todos">← Back to all todos</a>

{#if todo}
    <Todo {todo} heading={true} />
{:else}
    <h1>Todo {todoId}</h1>
{/if}

<TaskList {todoId} />
<TaskForm {todoId} />

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
