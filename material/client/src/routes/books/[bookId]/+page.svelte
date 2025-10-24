<script>
  import Book from "$lib/components/books/Book.svelte";

  import ChapterForm from "$lib/components/books/ChapterForm.svelte";
  import ChapterList from "$lib/components/books/ChapterList.svelte";

  import { initBook } from "$lib/states/bookState.svelte.js";
  import { initBookChapters } from "$lib/states/chapterState.svelte.js";

  let { data } = $props();

  let bookId = parseInt(data.bookId);

  $effect(() => {
    initBook(bookId);
    initBookChapters(bookId);
  });
</script>

<Book {bookId} />

<ChapterList {bookId} />

<ChapterForm {bookId} />
