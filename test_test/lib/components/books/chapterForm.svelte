<script>
    import { useChapterState } from "$lib/states/chapterState.svelte.js";
    let { bookId } = $props();

    let chapterState = useChapterState();
    let chapterTitle = $state("");
    let chapterContent = $state("");
    let chapterNumber = $state("");

    const addChapter = (event) => {
        event.preventDefault();

        const chapter = {
            book_id: bookId,
            chapter_number: parseInt(chapterNumber),
            title: chapterTitle,
            content: chapterContent,
        };

        chapterState.addChapter(bookId, chapter);

        chapterTitle = "";
        chapterContent = "";
        chapterNumber = "";
    };
</script>

<form onsubmit={addChapter}>
    <label>
        Chapter title
        <input type="text" bind:value={chapterTitle} required />
    </label>

    <label>
        Content
        <textarea bind:value={chapterContent} required></textarea>
    </label>

    <label>
        Chapter number
        <input type="number" bind:value={chapterNumber} required />
    </label>

    <button type="submit">Add Chapter</button>
</form>
