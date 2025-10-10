<script>
    let contacts = [];
    let nextId = 1;
    let error = "";

    function addContact(e) {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form));
        if (!data.name.trim() || !data.phone.trim()) {
            error = "Both name and phone are required.";
            return;
        }
        contacts = [
            ...contacts,
            { id: nextId++, name: data.name.trim(), phone: data.phone.trim() },
        ];
        error = "";
        form.reset();
    }

    function removeContact(id) {
        contacts = contacts.filter((c) => c.id !== id);
    }

    function clearError() {
        error = "";
    }
</script>

<h1>Contacts</h1>

<h2>Add Contact</h2>
<form on:submit={addContact} autocomplete="off">
    <label for="name">
        Name
        <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            autocomplete="off"
            on:input={clearError}
        />
    </label>

    <label for="phone">
        Phone
        <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone number"
            autocomplete="off"
            on:input={clearError}
        />
    </label>

    {#if error}
        <p class="error" role="alert" aria-live="polite">{error}</p>
    {/if}

    <button type="submit">Add Contact</button>
</form>

<h2>Contact List</h2>
<ul>
    {#each contacts as c (c.id)}
        <li>
            {c.name}
            <div>
                {c.phone}
                <button type="button" on:click={() => removeContact(c.id)}>
                    Remove
                </button>
            </div>
        </li>
    {/each}
</ul>

<style>
    .error {
        color: #b00;
        margin: 0.25rem 0;
    }
    ul div {
        margin-left: 0.5em;
        display: inline;
    }
</style>
