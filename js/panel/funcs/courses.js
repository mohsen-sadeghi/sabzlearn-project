import { getToken } from "../../funcs/utils.js";


const getAllCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();
  const courseWrapperElem = document.querySelector(".course-wrapper");
  courses.forEach((course, index) => {
    courseWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
         <td>
            ${++index}
         </td>
         <td id="name">
         <a>${course.name}</a>
        </td>
        <td id="price">${course.price ? course.price : "رایگان"}</td>
         <td id="id">${course.registers}</td>
         <td id="number">${course.support}</td>
         <td id="condition">${course.categoryID.title}</td>
         <td id="id">

         ${Array(course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                `<img src="../../../images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
            )
            .join(" ")}

         ${Array(5 - course.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                `<img src="../../../images/svgs/star.svg" alt="rating" class="course-box__star">`
            )
            .join(" ")}
         </td>
         <td id="id">${course.isComplete ? "تکمیل شده" : "در حال برگزاری"}</td>
         <td>
            <button type="button" class="btn btn-primary" id="edit-btn"  >ویرایش</button>
         </td>
         <td>
            <button type="button" class="btn btn-danger" id="delete-btn" onclick='removeCourses(${JSON.stringify(course._id)})'>حذف</button>
         </td>
        </tr>
        `
    );
  });
  return courses;
};


const removeCourses = async Id => {
    const res = await fetch(`http://localhost:4000/v1/courses/${Id}` , {
      method : "DELETE",
      headers: {
        "Authorization" : `Bearer ${getToken()}`,
        "Content-Type" : "application/json"
      },
    })
    const data = await res.json()
    getAllCourses()
}

export { getAllCourses , removeCourses};
