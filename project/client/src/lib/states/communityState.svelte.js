// communities stored in localStorage under key "communities"
const STORAGE_KEY = "communities";

// load once (browser only)
let initial = [];
if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) initial = parsed;
        } catch {
            // ignore bad data
        }
    }
}

let communityState = $state(initial); // [{ id, name, description }]

const save = () => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(communityState));
    }
};

const useCommunityState = () => {
    return {
        get communities() {
            return communityState;
        },
        addCommunity: (name, description) => {
            const n = (name ?? "").toString().trim();
            const d = (description ?? "").toString().trim();
            if (!n || !d) return;
            const id = communityState.length + 1; // per spec
            communityState.push({ id, name: n, description: d });
            save();
        },
        removeCommunity: (id) => {
            communityState = communityState.filter((c) => c.id !== id);
            save();
        },
        getOne: (id) => {
            const key = Number(id);
            return communityState.find((c) => c.id === key);
        }
    };
};

export { useCommunityState };
