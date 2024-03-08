import { getAdminInfos } from "./funcs/utils.js";
window.addEventListener("load", () => {
  const adminNameTopBarElem = document.querySelector("#admin-name");
  const adminWelcomeNameElem = document.querySelector("#admin-welcome-name");
  getAdminInfos().then((admin) => {
    console.log(admin);

    // protect cms Routes
    if (admin.role === "ADMIN") {
      // show admin name
      adminNameTopBarElem.innerHTML = admin.name;
      adminWelcomeNameElem.innerHTML = admin.name;
    } else {
      location.replace('./../../login.html');
    }
  });
});
