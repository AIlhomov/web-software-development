<script>
  let { bookId, chapterId } = $props();

  import { useBookState } from "$lib/states/bookState.svelte.js";
  import { useChapterState } from "$lib/states/chapterState.svelte.js";

  let bookState = useBookState();
  let chapterState = useChapterState();

  let book = bookState.getOne(bookId);
  let chapter = chapterState.chapters[bookId].find((c) => c.id === chapterId);
</script>

<h1>{book.name}</h1>

<h2>{chapter.name}</h2>

<p>This is chapter {chapter.id} of book {book.id}.</p>
