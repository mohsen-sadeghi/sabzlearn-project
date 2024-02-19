import { showSearchCourses } from "./funcs/shared.js"
import {getUrlParam} from "./funcs/utils.js";
window.addEventListener('load' , ()=>{
    const userSearch = getUrlParam('searchName')
    showSearchCourses(userSearch)
})