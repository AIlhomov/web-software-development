<!--
<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const authState = useAuthState();
</script>

{#if authState.user}
    <a href="/todos">Go to your todos</a>
{:else}
    <p>Hello anonymous!</p>
{/if}
-->
<form class="mx-auto w-full max-w-md space-y-4">
    <h2 class="h2">Add a book</h2>

    <label class="label">
        <span class="label-text">Title</span>
        <input
            id="title"
            name="title"
            type="text"
            placeholder="Book title"
            class="input"
        />
    </label>

    <label class="label">
        <span class="label-text">Description</span>
        <textarea
            id="description"
            name="description"
            placeholder="Enter book description"
            class="textarea"
        ></textarea>
    </label>

    <label class="label">
        <span class="label-text">Published at</span>
        <input
            id="published_at"
            name="published_at"
            type="date"
            class="input"
        />
    </label>

    <label class="label">
        <span class="label-text">Page count</span>
        <input id="page_count" name="page_count" type="number" class="input" />
    </label>

    <input
        type="submit"
        value="Add Book"
        class="btn preset-filled-primary-500"
    />
</form>
