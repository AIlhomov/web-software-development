<script>
    let { data } = $props();
    let todoId = Number(data.todoId);
    let taskId = Number(data.taskId);
</script>

<a href={`/todos/${todoId}`}>← Back to Todo {todoId}</a>
<h1>Todo {todoId}, task {taskId}</h1>
