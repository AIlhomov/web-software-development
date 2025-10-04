<script>
  import { useBookState } from "$lib/states/bookState.svelte.js";
  let bookState = useBookState();

  let bookName = $state("");
  const addBook = () => {
    bookState.addBook(bookName);
    bookName = "";
  };
</script>

<input type="text" bind:value={bookName} placeholder="Book name" />
<button onclick={addBook}>Add Book</button>
