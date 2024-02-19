import {
  getCourseDetails,
  getAndShowRelatedCourses,
  submitComments,
} from "./funcs/shared.js";

window.addEventListener("load", () => {
  const commentsRespondElem = document.querySelector(".comments__respond-btn");
  getCourseDetails();
  getAndShowRelatedCourses().then((data) => {
    console.log(data);
  });
  commentsRespondElem.addEventListener("click", () => {
    submitComments();
  });
});
