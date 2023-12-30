import { getAndShowCategoryCourses , inertCourseBoxHtmlTemplate} from "./funcs/shared.js"
window.addEventListener('load' , ()=>{
    getAndShowCategoryCourses().then(categoryCourses => {
        let containerCategory = document.querySelector('.container-category-courses')
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent') 
        const coursesFilteringSelection = document.querySelectorAll('.courses-top-bar__selection-item')
        let courses = [...categoryCourses]
        
        let coursesShowType = 'row'
        // show category courses by row show type
        if(categoryCourses.length){
          coursesShowType = 'row'
          inertCourseBoxHtmlTemplate(categoryCourses , coursesShowType , containerCategory)
        }else{
            containerCategory.insertAdjacentHTML('beforeend' , `<div class="alert alert-danger"> هیچ دوره ای برای این دسته بندی وجود ندارد :( </div>`)
        }

        // show category courses by row show type (User Selection) 
        coursesShowTypeIcons.forEach(coursesShowTypeIcon => {
            coursesShowTypeIcon.addEventListener('click' , event => {
                coursesShowTypeIcons.forEach(icon => icon.classList.remove('courses-top-bar__icon--active'))
                event.target.classList.add('courses-top-bar__icon--active')

                if(String(event.target.className).includes('row')){
                    coursesShowType = 'row'
                    containerCategory.innerHTML = ''
                    inertCourseBoxHtmlTemplate(categoryCourses , coursesShowType , containerCategory)
                }else{
                  coursesShowType = 'column'
                  containerCategory.innerHTML = ''
                  inertCourseBoxHtmlTemplate(categoryCourses , coursesShowType , containerCategory)
                }

            })
        })

        // show category courses by user Filtering methods
        coursesFilteringSelection.forEach( coursesFiltering =>{
          coursesFiltering.addEventListener('click' , event => {
            coursesFilteringSelection.forEach(courses > courses.classList.remove('courses-top-bar__selection-item--active'))
            event.target.classList.add('courses-top-bar__selection-item--active')
          })
        })
    })
})