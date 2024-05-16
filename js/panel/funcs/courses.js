import { getToken } from "../../funcs/utils.js";
import { showSwal } from "../../funcs/utils.js";

let categoryId = -1;
let status = "start";
let courseCover = null;

const getAllCourses = async () => {
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();
  const courseWrapperElem = document.querySelector(".course-wrapper");
  courseWrapperElem.innerHTML = "";
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
            <button type="button" class="btn btn-danger" id="delete-btn" onclick='removeCourses(${JSON.stringify( course._id )})'>حذف</button>
         </td>
        </tr>
        `
    );
  });
  return courses;
};

const prepareCreateCorseFrom = async () => {
  const categoryListElem = document.querySelector(".category-list");
  const courseStatusPresellElem = document.querySelector("#presell");
  const courseStatusStartElem = document.querySelector("#start");
  const courseCoverElem = document.querySelector("#course-cover");
  const res = await fetch("http://localhost:4000/v1/category");
  const categoryCourses = await res.json();
  console.log(categoryCourses);
  categoryCourses.forEach((category) => {
    categoryListElem.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${category._id}">${category.title}</option>
    `
    );
  });
  categoryListElem.addEventListener(
    "change",
    (event) => (categoryId = event.target.value)
  );

  courseStatusPresellElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );
  courseStatusStartElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );
  courseCoverElem.addEventListener(
    "change",
    (event) => (courseCover = event.target.files[0])
  );
};

const removeCourses = async (Id) => {
  showSwal(
    "آیا از حذف دوره اطمینان دارید ؟؟",
    "warning",
    ["نه", "آره"],
    async () => {
      const res = await fetch(`http://localhost:4000/v1/courses/${Id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        showSwal(
          "دوره شما با موفقیت حذف شد",
          "success",
          "خیلی هم عالی ",
          () => getAllCourses()
        );
      }
    }
  );
};

const createNewCourse = async () => {
  const courseNameElem = document.querySelector("#course-name");
  const coursePriceElem = document.querySelector("#course-price");
  const courseDescriptionElem = document.querySelector("#course-description");
  const courseShortnameElem = document.querySelector("#course-shortname");
  const courseSupportElem = document.querySelector("#course-support");
  const formData = new FormData();
  formData.append("name", courseNameElem.value.trim());
  formData.append("price", coursePriceElem.value.trim());
  formData.append("description", courseDescriptionElem.value.trim());
  formData.append("shortName", courseShortnameElem.value.trim());
  formData.append("support", courseSupportElem.value.trim());
  formData.append("categoryID", categoryId);
  formData.append("status", status);
  formData.append("cover", courseCover);

  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (res.ok) {
    showSwal("دوره شما با موفقیت اضافه شد", "success", "خیلی هم عالی ", () =>
      getAllCourses()
    );
  } else {
    showSwal("دوره اضافه نشد", "error", "ورود به صفحه اصلی", () => {});
  }
};

export {
  getAllCourses,
  removeCourses,
  createNewCourse,
  prepareCreateCorseFrom,
};
