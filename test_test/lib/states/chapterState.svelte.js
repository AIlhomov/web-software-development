let chapterState = $state({});

const useChapterState = () => {
    return {
        get chapters() {
            return chapterState;
        },
        addChapter: (bookId, chapter) => {
            if (!chapterState[bookId]) {
                chapterState[bookId] = [];
            }

            const newId = chapterState[bookId].length > 0
                ? Math.max(...chapterState[bookId].map(c => c.id)) + 1
                : 1;

            chapter.id = newId;
            chapterState[bookId].push(chapter);
        },
    };
};

export { useChapterState };
