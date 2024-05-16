import { getAndShowAllContacts , showContactMessage , answerToContact , removeContact} from "./funcs/contacts.js"
window.showContactMessage = showContactMessage
window.answerToContact = answerToContact
window.removeContact = removeContact
window.addEventListener('load'  , ()=>{
    getAndShowAllContacts()
})