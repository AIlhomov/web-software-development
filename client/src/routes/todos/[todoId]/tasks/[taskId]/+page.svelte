<script>
    import { page } from "$app/stores";
    import Task from "$lib/components/todos/Task.svelte";
    import TaskList from "../../../../../lib/components/todos/TaskList.svelte";
    let { data } = $props();

    console.log("todoId:", data.todoId, "taskId:", data.taskId);
</script>

<main>
    <Task todoId={data.todoId} taskId={data.taskId} />
    <TaskList todoId={data.todoId} />
    <!-- IMPORTANT TO SEND DATA OTHER UNDEFINED-->
    <a href="/todos/{data.todoId}">Back to todo</a>
</main>
