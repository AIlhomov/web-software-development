<script>
    let message = $state("");

    const fetchMessage = async () => {
        const response = await fetch(
            "https://hello-world.aalto-web-software-development.deno.net/",
        );
        const data = await response.json();
        message = data.message;
    };
</script>

<h1>Deployment demo!</h1>

<p>Message from server: {message}</p>

<button onclick={fetchMessage}>Fetch Message</button>
