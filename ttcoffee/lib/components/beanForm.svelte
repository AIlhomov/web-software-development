<script>
    import { useBeanState } from "$lib/states/beanState.svelte.js";

    const beans = useBeanState();

    const addBean = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await beans.add(data);
        e.target.reset();
    };
</script>

<form onsubmit={addBean}>
    <label>Name <input name="name" type="text" /></label>
    <label
        >Roast
        <select name="roast">
            <option value="light">light</option>
            <option value="medium">medium</option>
            <option value="dark">dark</option>
        </select>
    </label>
    <button type="submit">Add</button>
</form>
