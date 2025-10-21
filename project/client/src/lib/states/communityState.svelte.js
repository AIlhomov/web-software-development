import { getCommunities, getCommunity, createCommunity, deleteCommunity } from "$lib/apis/communitiesApi.js";

let communityState = $state([]); // [{ id, name, description, created_at }]

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        loadCommunities: async () => {
            const response = await getCommunities();
            if (response.error) {
                console.error("Failed to load communities:", response.error);
                communityState = [];
                return;
            }
            communityState = response.data;
        },
        loadCommunity: async (communityId) => {
            const response = await getCommunity(communityId);
            if (response.error) {
                console.error("Failed to load community:", response.error);
                return null;
            }
            const community = response.data;
            // Update or add the community in the state
            const index = communityState.findIndex((c) => c.id === community.id);
            if (index >= 0) {
                communityState[index] = community;
            } else {
                communityState.push(community);
            }
            return community;
        },
        addCommunity: async (name, description) => {
            const n = (name ?? "").toString().trim();
            const d = (description ?? "").toString().trim();
            if (!n || !d) return;

            const response = await createCommunity({ name: n, description: d });
            if (response.error) {
                console.error("Failed to create community:", response.error);
                return;
            }
            communityState.push(response.data);
        },
        removeCommunity: async (id) => {
            const response = await deleteCommunity(id);
            if (response.error) {
                console.error("Failed to delete community:", response.error);
                return;
            }
            communityState = communityState.filter((c) => c.id !== id);
        },
        getOne: (id) => {
            const key = Number(id);
            return communityState.find((c) => c.id === key);
        }
    };
};

export { useCommunityState };
