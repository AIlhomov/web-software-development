<script>
  import { useBookState } from "$lib/states/bookState.svelte.js";

  let bookState = useBookState();
</script>

<ul>
  {#each bookState.books as book}
    <li>
      <a href={`/books/${book.id}`}>{book.name}</a>
    </li>
  {/each}
</ul>
