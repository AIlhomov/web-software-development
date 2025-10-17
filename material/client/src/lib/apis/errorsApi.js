import { PUBLIC_API_URL } from "$env/static/public";

const getData = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/errors/${id}`);
    return await response.json();
};

export { getData };