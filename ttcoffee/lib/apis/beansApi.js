import { PUBLIC_API_URL } from "$env/static/public";

const getBeans = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/api/beans`);
    if (!response.ok) {
        throw new Error("Failed to fetch beans");
    }
    return await response.json();
};

const createBean = async (bean) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/beans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bean),
    });
    if (!response.ok) {
        throw new Error("Failed to create bean");
    }
    return await response.json();
};

const updateBean = async (id, bean) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/beans/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bean),
    });
    if (!response.ok) {
        throw new Error("Failed to update bean");
    }
    return await response.json();
};

const deleteBean = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/beans/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete bean");
    }
    return await response.json();
};

export { getBeans, createBean, updateBean, deleteBean };
