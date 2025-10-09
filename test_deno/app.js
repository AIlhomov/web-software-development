const handleRequest = (request) => {
    const method = request.method;
    const url = new URL(request.url);
    const pathname = url.pathname;
    const params = url.searchParams;

    let message = "Not here.";

    if (method === "GET" && pathname === "/") {
        message = "Hi there!";
    } else if (method === "GET" && pathname === "/congrats") {
        const heroOfTheDay = params.get("heroOfTheDay");
        message = `Congrats, ${heroOfTheDay}!`;
    } else if (method === "SUM" && pathname === "/") {
        const a = params.get("a");
        const b = params.get("b");
        if (a !== null && b !== null) {
            message = String(Number(a) + Number(b));
        } else {
            message = "Invalid parameters.";
        }
    } else if (method === "DIDNOT" && pathname === "/lol") {
        message = "What kind of tree fits in your hand? A palm tree.";
    }

    return new Response(message);
};

export default handleRequest;
