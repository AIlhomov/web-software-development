let bookState = $state([
  { id: 1, name: "HTML for Hamsters" },
  { id: 2, name: "CSS: Cannot Style Sandwiches" },
  { id: 3, name: "JavaScript and the Fifty Shades of Errors" },
]);

const useBookState = () => {
  return {
    get books() {
      return bookState;
    },
    getOne: (id) => {
      return bookState.find((b) => b.id === id);
    },
    // new function
    addBook: (name) => {
      bookState.push({ id: bookState.length + 1, name });
    },
    // new function end
  };
};

export { useBookState };
