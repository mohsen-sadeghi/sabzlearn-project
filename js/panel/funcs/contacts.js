import { showSwal, getToken } from "../../funcs/utils.js";

const getAndShowAllContacts = async () => {
  const contactsWrapper = document.querySelector(".table tbody");
  const res = await fetch("http://localhost:4000/v1/contact");
  const allContacts = await res.json();
  contactsWrapper.innerHTML = "";
  console.log(allContacts);
  allContacts.forEach((contact, index) => {
    contactsWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
        <td class="${contact.answer ? "bg-green" : "bg-red"}">${index + 1}</td>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>${contact.createdAt.slice(0, 10)}</td>
        <td>
            <button type='button' onclick='showContactMessage("${
              contact.body
            }")'  class='btn btn-primary edit-btn'>مشاهده</button>
        </td>
        <td>
        <button type='button' onclick='answerToContact("${contact.email}")' class='btn btn-primary edit-btn'>پاسخ</button>
    </td>
        <td>
            <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
        </td>
        <td>
            <button type='button' onclick='removeContact("${contact._id}")' class='btn btn-danger delete-btn'>حذف</button>
        </td>
    </tr>
        `
    );
  });
};

const showContactMessage = (message) => {
  showSwal(message, undefined, "مشاهده کردم", () => {});
};

const answerToContact = (userEmail) => {
  swal({
    title: "لطفا پاسخ را وارد نمایید :",
    content: "input",
    button: "ثبت پاسخ",
  }).then(async (result) => {
    if(result){
      const newAnswerQuestions = {
        email: userEmail,
        answer: result,
      };
      const res = await fetch("http://localhost:4000/v1/contact/answer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswerQuestions),
      });
      if (res.ok) {
        swal({ title: "پاسخ شما با موفقیت ثبت شد", icon: "success" });
        getAndShowAllContacts()
      }
    }else{
      swal({ title: "لطفا پاسخ را به درستی وارد نمایید :)", icon: "error" });
    }
  });
};

const removeContact = (userId)=>{
  showSwal("مطمعن به حذف نظر هستید؟؟" , "warning" , ["نه" , 'آره'] , async (result)=>{
    if(result){
      const res = await fetch(`http://localhost:4000/v1/contact/${userId}` , {
        method:'DELETE',
        headers:{
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        }
      })
      if(res.ok){
        showSwal("نظر شما حذف شد " , "success" , "خیلی خوب" ,()=>{})
        getAndShowAllContacts()
      }
    }
  })
}

export { getAndShowAllContacts, showContactMessage, answerToContact , removeContact};
