import { getHomepagePosts } from "$lib/apis/postsApi.js";

let homePageState = $state({
    posts: []
});

const useHomePageState = () => {
    return {
        get posts() {
            return homePageState.posts;
        },
        loadPosts: async () => {
            const response = await getHomepagePosts();
            if (response.error) {
                console.error("Failed to load homepage posts:", response.error);
                homePageState.posts = [];
                return;
            }
            homePageState.posts = response.data;
        }
    };
};

export { useHomePageState };
