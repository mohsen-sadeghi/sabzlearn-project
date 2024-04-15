import { getAndShowAllUsers , removeUsers , banUsers , createNewUser} from "./funcs/users.js"
window.removeUsers = removeUsers
window.banUsers = banUsers
window.addEventListener('load' , ()=>{
    const createNewUserBtn = document.querySelector('#submit-btn')
    getAndShowAllUsers()
    createNewUserBtn.addEventListener('click' , event =>{
        event.preventDefault()
        createNewUser()
    })
})