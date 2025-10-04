<script>
  import Chapter from "$lib/components/books/Chapter.svelte";

  let { data } = $props();
  let bookId = parseInt(data.bookId);
  let chapterId = parseInt(data.chapterId);
</script>

<Chapter bookId={bookId} chapterId={chapterId} />
