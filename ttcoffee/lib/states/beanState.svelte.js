import { getBeans, createBean, deleteBean } from "$lib/apis/beansApi.js";

let beanState = $state([]);

const useBeanState = () => {
    return {
        get beans() {
            return beanState;
        },
        load: async () => {
            const beans = await getBeans();
            beanState = beans;
        },
        add: async (bean) => {
            const created = await createBean(bean);
            beanState.push(created);
        },
        remove: async (beanId) => {
            await deleteBean(beanId);
            beanState = beanState.filter((b) => b.id !== beanId);
        },
    };
};

export { useBeanState };
