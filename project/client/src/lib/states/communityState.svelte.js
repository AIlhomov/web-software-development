import { getCommunities, getCommunity, createCommunity, deleteCommunity } from "$lib/apis/communitiesApi.js";

let communityState = $state([]); // [{ id, name, description, created_at }]

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        loadCommunities: async () => {
            const communities = await getCommunities();
            communityState = communities;
        },
        loadCommunity: async (communityId) => {
            const community = await getCommunity(communityId);
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

            const created = await createCommunity({ name: n, description: d });
            communityState.push(created);
        },
        removeCommunity: async (id) => {
            await deleteCommunity(id);
            communityState = communityState.filter((c) => c.id !== id);
        },
        getOne: (id) => {
            const key = Number(id);
            return communityState.find((c) => c.id === key);
        }
    };
};

export { useCommunityState };
