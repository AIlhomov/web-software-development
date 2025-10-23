import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";

export const load = () => {
    if (browser) {
        const user = localStorage.getItem("user");
        if (!user) {
            throw error(401, "Unauthorized");
        }

        const roles = JSON.parse(user).roles || [];
        if (!roles.includes("ADMIN")) {
            throw error(403, "Forbidden");
        }
    }
};