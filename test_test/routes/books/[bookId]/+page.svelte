<script>
    let { data } = $props();

    import ChapterForm from "$lib/components/books/ChapterForm.svelte";
    import ChapterList from "$lib/components/books/ChapterList.svelte";

    const bookId = parseInt(data.bookId);
</script>

<h1>Chapter list for book {bookId}</h1>

<ChapterList {bookId} />

<ChapterForm {bookId} />
