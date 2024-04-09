import { getAndShowAllMenus , prepareCreateMenuFrom , createNewMenu , removeMenuAndSubmenu} from "./funcs/manus.js"
window.removeMenuAndSubmenu = removeMenuAndSubmenu
window.addEventListener('load' , ()=>{
    const createMenuBtnElem = document.querySelector('#submit')
    prepareCreateMenuFrom()
    getAndShowAllMenus()
    createMenuBtnElem.addEventListener('click' , event =>{
        event.preventDefault()
        createNewMenu()
    })
})