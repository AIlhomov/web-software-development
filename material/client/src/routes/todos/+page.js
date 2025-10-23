import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export function load() {
    if (browser) {
        const token = localStorage.getItem("token");
        if (!token) {
            throw redirect(302, "/auth/login");
        }
    }
}
