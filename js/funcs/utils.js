const showSwal = (title, icon, buttons, callback) => {
  swal({
    title: title,
    icon: icon,
    buttons: buttons,
  }).then((result) => callback(result));
};

const saveInToLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  return userInfos ? userInfos.token : null;
};

const isLogin = () => {
  const userInfos = localStorage.getItem("user");
  return userInfos ? true : false;
};

const getUrlParam = key =>{
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

const searchInArray = (array , searchProperty , searchValue)=>{
     let outPutArray = array.filter(item => item[searchProperty].includes(searchValue))
     return outPutArray 
}

const paginateItems = (array , itemsPerPages , paginateParentElement, currentPage , link) => {
  paginateParentElement.innerHtml = ''
  let endIndex = itemsPerPages * currentPage
  let startIndex = endIndex - itemsPerPages
  let paginatedCount = Math.ceil(array.length / itemsPerPages)
  let paginateItem = array.slice(startIndex , endIndex)
  for(let i = 1 ; i < paginatedCount ; i++){
    paginateParentElement.insertAdjacentHTML('beforeend' , `
    <li class="courses__pagination-item">
              <a href=${link}?cat=${getUrlParam('cat')}&paginate=${i} class="${currentPage == i ? "courses__pagination-link courses__pagination-link--active":"courses__pagination-link"}">
                ${i}
              </a>
            </li>    
            `)
  }
  return paginateItem
}

export {showSwal,saveInToLocalStorage,getFromLocalStorage,getToken,isLogin,getUrlParam , searchInArray , paginateItems};