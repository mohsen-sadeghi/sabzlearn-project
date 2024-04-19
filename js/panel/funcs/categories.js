import { getToken, showSwal } from "../../funcs/utils.js";

const getAndShowAllCategories = async () => {
  const categoriesListElem = document.querySelector(".table tbody");
  const res = await fetch(`http://localhost:4000/v1/category`);
  const getAllCategories = await res.json();
  console.log(getAllCategories);

  categoriesListElem.innerHTML = "";
  getAllCategories.forEach((category, index) => {
    categoriesListElem.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      <td>${index + 1}</td>
      <td>${category.title}</td>
      <td>${category.name}</td>
      <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
      </td>
      <td>
            <button type='button' onclick="removeCategory('${
              category._id
            }')" class='btn btn-danger delete-btn'>حذف</button>
      </td>
    </tr>
    `
    );
  });
};

const createCategories = async () => {
  const titleCategoriesElem = document.querySelector("#title");
  const nameCategoriesElem = document.querySelector("#name");
  const newCategories = {
    title: titleCategoriesElem.value.trim(),
    name: nameCategoriesElem.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/category`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategories),
  });
  if (res.ok) {
    showSwal("کتگوری شما با موفقیت اضافه شد", "success", "خیلی هم عالی ", () =>
      getAndShowAllCategories()
    );
  }
};

const removeCategory = async (userId) => {
  showSwal("مطمعن به حذف هستید", "warning", ["نه", "آره"], async (result) => {
    if (result) {
      const res = await fetch(`http://localhost:4000/v1/category/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        showSwal(
          "کتگوری شما با موفقیت حذف شد",
          "success",
          "خیلی هم عالی ",
          () => getAndShowAllCategories()
        );
      }
    }
  });
};

export { getAndShowAllCategories, removeCategory, createCategories };
