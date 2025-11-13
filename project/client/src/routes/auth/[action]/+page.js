export function load({ params }) {
    const { action } = params;

    // Validate action parameter
    if (action !== "login" && action !== "register") {
        throw new Error("Invalid action");
    }

    return {
        action,
    };
}
