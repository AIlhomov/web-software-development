// LocalStorage key
const STORAGE_KEY = "posts";

// Load once (browser only)
let initial = {};
if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") initial = parsed;
        } catch { }
    }
}

// Shape: { [communityId:number]: [{ id:number, title:string, content:string }] }
let postState = $state(initial);

const save = () => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(postState));
    }
};

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        getPosts: (communityId) => {
            const cid = Number(communityId);
            return postState[cid] ?? [];
        },
        addPost: (communityId, title, content) => {
            const cid = Number(communityId);
            const t = (title ?? "").toString().trim();
            const c = (content ?? "").toString().trim();
            if (!t || !c) return;

            if (!postState[cid]) postState[cid] = [];
            const list = postState[cid];
            const nextId = list.length ? Math.max(...list.map((p) => p.id)) + 1 : 1;
            list.push({ id: nextId, title: t, content: c });
            save();
        },
        removePost: (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            if (!postState[cid]) return;
            postState[cid] = postState[cid].filter((p) => p.id !== pid);
            save();
        },
        getPost: (communityId, postId) => {
            const cid = Number(communityId);
            const pid = Number(postId);
            const list = postState[cid] ?? [];
            return list.find((p) => p.id === pid);
        }
    };
};

export { usePostState };
