<script>
  let { bookId } = $props();
  import ChapterList from "$lib/components/books/ChapterList.svelte";
  import { useBookState } from "$lib/states/bookState.svelte.js";

  let bookState = useBookState();

  let book = bookState.getOne(bookId);
</script>

<h1>{book.name}</h1>

<ChapterList {bookId} />
