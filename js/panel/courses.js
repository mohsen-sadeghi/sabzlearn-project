import { getAllCourses , removeCourses } from "./funcs/courses.js"
window.removeCourses = removeCourses
window.addEventListener('load' , ()=>{
    getAllCourses().then(data => {
        console.log(data);
    })
})

