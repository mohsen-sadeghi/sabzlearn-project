import {
  getAndShowAllCategories,
  removeCategory,
  createCategories,
} from "./funcs/categories.js";
window.removeCategory = removeCategory;
window.addEventListener("load", () => {
  const createCategoriesElem = document.querySelector("#create-category");

  getAndShowAllCategories();
  createCategoriesElem.addEventListener("click", event => {
    event.preventDefault()
    createCategories();
  });
});
