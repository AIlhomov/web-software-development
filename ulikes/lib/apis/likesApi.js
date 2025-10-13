import { PUBLIC_API_URL } from "$env/static/public";

const getLikes = async (resourceId) => {
    const res = await fetch(
        `${PUBLIC_API_URL}/api/resources/${resourceId}/likes`,
    );
    return res.json();
};

const incLikes = async (resourceId) => {
    const res = await fetch(
        `${PUBLIC_API_URL}/api/resources/${resourceId}/likes`,
        {
            method: "POST",
        },
    );
    return res.json();
};

export { getLikes, incLikes };
