import {
  getAllCourses,
  removeCourses,
  createNewCourse,
  prepareCreateCorseFrom
} from "./funcs/courses.js";
window.removeCourses = removeCourses;
window.addEventListener("load", () => {
  const submitBtnElem = document.querySelector(".submit-btn");
  getAllCourses();
  prepareCreateCorseFrom();
  submitBtnElem.addEventListener("click", async (event) => {
    event.preventDefault();
    createNewCourse();
  });
});
