<script>
    import { authFetch } from "$lib/utils/fetchUtils.js";
    import { PUBLIC_API_URL } from "$env/static/public";

    let message = $state(null);

    const fetchData = async () => {
        try {
            const response = await authFetch(`${PUBLIC_API_URL}/api/secret`);
            const data = await response.json();
            message = data.message;
        } catch (error) {
            message = error.message;
        }
    };
</script>

<button onclick={fetchData}>Fetch Protected Data</button>
<p>Message: {message}</p>
