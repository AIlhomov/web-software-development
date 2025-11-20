<script>
  import { useBookState } from "$lib/states/bookState.svelte.js";

  let bookState = useBookState();
</script>

{#if bookState.books.length === 0}
  <div class="text-center py-12">
    <p class="text-4xl mb-4">📚</p>
    <p class="text-lg text-surface-600 mb-2">The library is empty</p>
    <p class="text-sm text-surface-500">Add a book to get started!</p>
  </div>
{:else}
  <ul class="space-y-4">
    {#each bookState.books as book (book.id)}
      <li class="card border-2 border-surface-300">
        <div class="flex items-center justify-between p-4 gap-4">
          <div class="flex-grow min-w-0">
            <a href={`/books/${book.id}`} class="anchor text-lg font-semibold">
              {book.title}
            </a>
            {#if book.description}
              <p class="text-sm text-surface-600 mt-1 line-clamp-2">
                {book.description}
              </p>
            {/if}
            <div class="flex flex-wrap gap-3 mt-2 text-sm text-surface-700">
              {#if book.published_at}
                <span
                  >📅 {new Date(book.published_at).toLocaleDateString()}</span
                >
              {/if}
              {#if book.page_count}
                <span>📖 {book.page_count} pages</span>
              {/if}
            </div>
          </div>
          <button class="btn" onclick={() => bookState.removeBook(book)}>
            🗑️ Remove
          </button>
        </div>
      </li>
    {/each}
  </ul>
{/if}
