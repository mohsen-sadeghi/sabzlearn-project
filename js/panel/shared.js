import { getAdminInfos } from "./funcs/utils.js";
import { insertNotificationsHtmlTemplate,seenNotification} from "./funcs/notifications.js";
window.seenNotification = seenNotification
window.addEventListener("load", () => {
  const adminNameTopBarElem = document.querySelector("#admin-name");
  const adminWelcomeNameElem = document.querySelector("#admin-welcome-name");
  const homeNotificationElem = document.querySelector(".home-notification");
  const homeNotificationBoxElem = document.querySelector(
    ".home-notification-modal"
  );
  

  getAdminInfos().then((admin) => {
    console.log(admin);

    // protect cms Routes
    if (admin.role === "ADMIN") {
      // show admin name 
      adminNameTopBarElem.innerHTML = admin.name;
      adminWelcomeNameElem.innerHTML = admin.name;
    } else {
      location.replace("./../../login.html");
    }

    homeNotificationElem.addEventListener("mouseenter", () => {
      homeNotificationBoxElem.classList.add("active-modal-notfication");
    });

    homeNotificationBoxElem.addEventListener("mouseleave", () => {
      homeNotificationBoxElem.classList.remove("active-modal-notfication");
    });
    insertNotificationsHtmlTemplate(admin.notifications)

  });
});

