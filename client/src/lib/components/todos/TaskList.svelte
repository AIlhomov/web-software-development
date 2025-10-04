<script>
    let { todoId } = $props();

    let todoTasks = {
        1: [
            { id: 1, name: "First task of first todo" },
            { id: 2, name: "Second task of first todo" },
        ],
        2: [
            { id: 1, name: "First task of second todo" },
            { id: 2, name: "Second task of second todo" },
        ],
        3: [
            { id: 1, name: "First task of third todo" },
            { id: 2, name: "Second task of third todo" },
        ],
    };

    console.log("TaskList received todoId:", todoId);
    console.log("TaskList current tasks:", todoTasks[todoId]);
</script>

<ul>
    {#each todoTasks[todoId] as task}
        <li>
            <a href="/todos/{todoId}/tasks/{task.id}">{task.name}</a>
        </li>
    {/each}
</ul>
