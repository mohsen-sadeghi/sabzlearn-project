import { getAndShowCategoryCourses , inertCourseBoxHtmlTemplate , coursesSorting} from "./funcs/shared.js"
import { searchInArray , paginateItems} from "./funcs/utils.js"
window.addEventListener('load' , ()=>{
    getAndShowCategoryCourses().then(categoryCourses => {
        let containerCategory = document.querySelector('.container-category-courses')
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent') 
        const coursesFilteringSelection = document.querySelectorAll('.courses-top-bar__selection-item')
        const selectionTitleElement = document.querySelector('.courses-top-bar__selection-title')
        const coursesSearchBoxInput = document.querySelector('.courses-top-bar__input')
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
            coursesFilteringSelection.forEach(courses => courses.classList.remove('courses-top-bar__selection-item--active'))
            event.target.classList.add('courses-top-bar__selection-item--active')
            selectionTitleElement.innerHTML = `
            ${event.target.innerHTML}
            <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
            `
            let userFilteringSelection = event.target.dataset.key
            let showCourses = coursesSorting(courses , userFilteringSelection , containerCategory)
            inertCourseBoxHtmlTemplate(showCourses , coursesShowType , containerCategory)
          })
        })
        // Handel course Search
        coursesSearchBoxInput.addEventListener('input' , async (event) =>{
          const shownCourses = searchInArray([...categoryCourses] , 'name' , event.target.value)
          if(shownCourses.length){
            inertCourseBoxHtmlTemplate(shownCourses , coursesShowType , containerCategory)
          }else{
            containerCategory.innerHTML = ''
            containerCategory.insertAdjacentHTML('beforeend' , `<div class="alert alert-danger"> هیچ دوره ای برای جست و جو شما وجود ندارد :( </div>`)
          }
        })
        // handel paginate
        const coursePaginateWrapper = document.querySelector('.courses__pagination-list')
        console.log(paginateItems(courses , 3 , coursePaginateWrapper , 2));
    })
})