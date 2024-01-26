import { getCourseDetails , getAndShowRelatedCourses} from "./funcs/shared.js";
window.addEventListener("load", () => {
  getCourseDetails()
  getAndShowRelatedCourses().then(data =>{
    console.log(data);
  })
}); 