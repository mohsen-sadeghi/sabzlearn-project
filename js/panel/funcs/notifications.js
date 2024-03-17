import { getToken } from "../../funcs/utils.js";

const insertNotificationsHtmlTemplate = (notifications) => {
  const homeNotificationNodalListElem = document.querySelector(
    ".home-notification-modal-list"
  );
  homeNotificationNodalListElem.innerHTML = ''
  if (notifications.length) {
    notifications.forEach((notification) => {
      homeNotificationNodalListElem.insertAdjacentHTML(
        "beforeend",
        `
          <li class="home-notification-modal-item">
            <span class="home-notification-modal-text">${notification.msg}</span>
            <a onclick='seenNotification(${JSON.stringify(notification)} ,${JSON.stringify(notification._id)})'>دیدم</a>
          </li>
        `
      );
    });
  } else {
    JSON.stringify()
    homeNotificationNodalListElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="alert alert-danger text-center">
          هیچ نوت  فیکیشنی وجود ندارد
        </li>
      `
    );
  }
};

const seenNotification = async (notification , notificationId) => {
  const res = await fetch(
    `http://localhost:4000/v1/notifications/see/${notificationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Brear ${getToken()}`,
      },
    }
  );

  removeNotification(notification , notificationId)
  const result = await res.json();
};

const removeNotification = (notifications, notificationId) => {
  const filteredNotifications = notifications.filter(
    notifications => notifications._id !== notificationId
  );
  insertNotificationsHtmlTemplate(filteredNotifications)
};

export { insertNotificationsHtmlTemplate, seenNotification };
