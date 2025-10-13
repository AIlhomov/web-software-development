import { browser } from "$app/environment";
import * as likesApi from "$lib/apis/likesApi.js";

let likesState = $state({});

const initLikes = async (resourceId) => {
    if (browser) {
        const likesData = await likesApi.getLikes(resourceId);
        likesState[resourceId] = likesData.likes;
    }
};

const useLikesState = () => {
    return {
        get likes() {
            return likesState;
        },
        incrementLikes: async (resourceId) => {
            const likesData = await likesApi.incLikes(resourceId);
            likesState[resourceId] = likesData.likes;
        },
    };
};

export { initLikes, useLikesState };
