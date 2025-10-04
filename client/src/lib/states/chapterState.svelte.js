let chapterState = $state({
  1: [
    { id: 1, name: "Hamster Homes" },
    { id: 2, name: "Tiny Tables" },
    { id: 3, name: "Forms & Seeds" },
  ],
  2: [
    { id: 1, name: "Styling Bread" },
    { id: 2, name: "Decorating Lettuce" },
    { id: 3, name: "Advanced Pickles" },
    { id: 4, name: "Garnish Mastery" },
  ],
  3: [
    { id: 1, name: "Oops 101" },
    { id: 2, name: "Many Errors" },
    { id: 3, name: "Fifty More Bugs" },
  ],
});

const useChapterState = () => {
  return {
    get chapters() {
      return chapterState;
    },
  };
};

export { useChapterState };
