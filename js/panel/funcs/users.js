import { getToken, showSwal } from "../../funcs/utils.js";

const getAndShowAllUsers = async () => {
  const usersWrapperElem = document.querySelector(".table tbody");
  usersWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const allUsers = await res.json();
  allUsers.forEach((user, index) => {
    usersWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
        <td>${index + 1}</td>
        <td>${user.username}</td>
        <td>${user.name}</td>  
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.role === "ADMIN" ? "مدیر" : "کاربر"}</td>
        <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
        </td>
        <td>
            <button type='button' onclick="removeUsers('${
              user._id
            }')"  class='btn btn-danger delete-btn'>حذف</button>
        </td>
        <td>
        <button type='button' onclick="banUsers('${
          user._id
        }')" class='btn btn-danger delete-btn'>بن</button>
    </td>
    </tr>
        `
    );
  });
  console.log(allUsers);
};

const removeUsers = async (id) => {
  showSwal("مطمعن به حذف هستید", "warning", ["نه", "آره"], async (result) => {
    if (result) {
      const res = await fetch(`http://localhost:4000/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        showSwal("دوره شما با موفقیت حذف شد", "success", "خیلی هم عالی ", () =>
          getAndShowAllUsers()
        );
      }
    }
  });
};

const banUsers = async (userId) => {
  showSwal(
    "مطمعن به بم کاربر هستید",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(
          `http://localhost:4000/v1/users/ban/${userId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log(res);
        if (res.ok) {
          showSwal(
            "کربر مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی ",
            () => {}
          );
        }
      }
    }
  );
};

const createNewUser = async () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`http://localhost:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfos),
  }).then((res) => {
    if (res.status === 201) {
      showSwal(
        "کاربر جدید با موفقیت ایجاد شد",
        "success",
        "خیلی هم عالی",
        () => {
          getAndShowAllUsers();
        }
      );
    } else if (res.status === 409) {
      showSwal(
        "نام کاربری یا ایمیل قبلا استفاده شده",
        "error",
        "تصحیح اطلاعات",
        () => {}
      );
    } else if (res.status === 403) {
      showSwal(
        "متاسفانه این شماره تماس بن شده است",
        "error",
        "تصحیح اطلاعات",
        () => {}
      );
    }
    return res.json();
  });
};

export { getAndShowAllUsers, removeUsers, banUsers, createNewUser };
