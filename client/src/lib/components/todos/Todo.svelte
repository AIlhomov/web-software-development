<script>
    let { todoId } = $props();
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import AddTask from "$lib/components/todos/AddTask.svelte";
    let todoState = useTodoState();
    //console.log("todoState", todoState);
    let todo = todoState.getOne(todoId);
    console.log("todo", todo);
</script>

<h1>Todo {todoId}</h1>
<AddTask {todoId} />

<TaskList {todoId} />
