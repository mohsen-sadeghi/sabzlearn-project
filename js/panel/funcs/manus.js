import { getToken } from "../../funcs/utils.js";
import { showSwal } from "../../funcs/utils.js";
let parentMenuId = undefined;
const getAndShowAllMenus = async () => {
  const menusWrapper = document.querySelector("table tbody");
  const res = await fetch(`http://localhost:4000/v1/menus/all`);
  const getMenus = await res.json();
  menusWrapper.innerHTML = ""
  console.log(getMenus);
  getMenus.forEach((menu, index) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
        <td>${index + 1}</td>
         <td>${menu.title}</td>
         <td><a href="#">${menu.href}</a></td>
         <td>${menu.parent ? menu.parent.title : "__"}</td>
         <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
         </td>
         <td>
            <button type='button' onclick='removeMenuAndSubmenu(${JSON.stringify(
              menu._id
            )})' class='btn btn-danger delete-btn'>حذف</button>
         </td>
        </tr>
        `
    );
  });
};

const prepareCreateMenuFrom = async () => {
  const parentMenusElem = document.querySelector(".select");
  parentMenusElem.addEventListener(
    "change",
    (event) => (parentMenuId = event.target.value)
  );
  const res = await fetch(`http://localhost:4000/v1/menus`);
  const manus = await res.json();
  manus.forEach((menu) => {
    parentMenusElem.insertAdjacentHTML(
      "beforeend",
      `
        <option value="${menu._id}">${menu.title}</option>
        `
    );
  });
};

const createNewMenu = async () => {
  const titleInputElem = document.querySelector("#title");
  const hrefInputElem = document.querySelector("#href");
  const newMenuInfos = {
    title: titleInputElem.value.trim(),
    href: hrefInputElem.value.trim(),
    parent: parentMenuId,
  };
  const res = await fetch(`http://localhost:4000/v1/menus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMenuInfos),
  });
  if (res.ok) {
    showSwal("دوره شما با موفقیت اضافه شد", "success", () => {
      getAndShowAllMenus();
    });
  }
};

const removeMenuAndSubmenu = async (id) => {
  showSwal(
    "آیا کیخواهید منو یا ساب منو را پاک کنید ؟؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      const res = await fetch(`http://localhost:4000/v1/menus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        showSwal("دوره شما با موفقیت حذف شد", "success", "خیلی هم عالی ", () =>
          getAndShowAllMenus()
        );
      }
    }
  );
};

export {
  getAndShowAllMenus,
  prepareCreateMenuFrom,
  createNewMenu,
  removeMenuAndSubmenu,
};
