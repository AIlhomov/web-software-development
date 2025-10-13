import { browser } from "$app/environment";
import * as chaptersApi from "$lib/apis/chaptersApi.js";

let chapterState = $state({});

const useChapterState = () => {
  return {
    get chapters() {
      return chapterState;
    },
    add: (bookId, chapter) => {
      chaptersApi.createChapter(bookId, chapter).then((newChapter) => {
        const chapters = chapterState[bookId] || [];
        chapters.push(newChapter);
        chapterState[bookId] = chapters;
      });
    },
  };
};
const initBookChapters = async (bookId) => {
  if (!browser) {
    return;
  }

  chapterState[bookId] = await chaptersApi.readChapters(bookId);
};

export { useChapterState, initBookChapters };