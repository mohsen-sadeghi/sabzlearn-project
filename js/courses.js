import { addAllCoursesToDom , inertCourseBoxHtmlTemplate } from "./funcs/shared.js"
import { paginateItems , getUrlParam} from "./funcs/utils.js";

window.addEventListener('load' , ()=>{
    addAllCoursesToDom().then(data =>{
        console.log(data);
        const coursesWrapperElem = document.querySelector('#courses-wrapper')
        const coursesPaginationWrapper = document.querySelector('#courses-pagintion')
        const shownCourses = paginateItems(data , 3 , coursesPaginationWrapper , getUrlParam('paginate') , 'courses.html')
        inertCourseBoxHtmlTemplate(shownCourses , 'row' , coursesWrapperElem)
    })
}) 