<script>
  import Book from "$lib/components/books/Book.svelte";

  let { data } = $props();
  let bookId = parseInt(data.bookId);
</script>

<Book bookId={bookId} />
