let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')
let healthNews = document.querySelector('#healthNews .newsBox')
let scienceNews = document.querySelector('#scienceNews .newsBox')           
let gamingNews = document.querySelector('#gamingNews .newsBox')             
let entertainmentNews = document.querySelector('#entertainmentNews .newsBox') 
let politicsNews = document.querySelector('#politicsNews .newsBox')         

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e) => {
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click', toggle)

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})


const apiKey = "2c915feaf7954c10aa1950ac4d17741e"
const fetchData = async (category, pageSize) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
}

const add_breakingNews = (data) => {
    const validData = data.filter(item => item.urlToImage && item.title && item.description)
    if (validData.length === 0) return; 

    breakingImg.innerHTML = `<img src=${validData[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${validData[0].url} target="_blank"><h2>${validData[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${validData[0].description}`
}
fetchData('general', 5).then(add_breakingNews)

const addNews = (data, container) => {
    let html = ''
    data.forEach((element) => {
        if(!element.urlToImage || !element.title) return;

        let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "..."
        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    container.innerHTML = html
}
const add_topNews = (data) => {
    let html = ''
    data.forEach((element) => {
        if(!element.urlToImage || !element.title) return;

        let title = element.title.length < 100 ? element.title : element.title.slice(0, 100) + "..."
        html += `<div class="news">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    topNews.innerHTML = html
}
fetchData('general', 20).then(add_topNews)
fetchData('sports', 5).then(data => addNews(data, sportsNews))
fetchData('business', 5).then(data => addNews(data, businessNews))
fetchData('technology', 5).then(data => addNews(data, techNews))
fetchData('health', 5).then(data => addNews(data, healthNews))
fetchData('science', 5).then(data => addNews(data, scienceNews))
fetchData('entertainment', 5).then(data => addNews(data, entertainmentNews))
fetchData('politics', 5).then(data => addNews(data, politicsNews))
fetchData('entertainment', 5).then(data => addNews(data, gamingNews)) 
function addComment() {
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');
  const commentText = commentInput.value.trim();
  if(commentText === '') return alert('Please write a comment.');
  const newComment = document.createElement('p');
  newComment.textContent = commentText;
  commentsList.appendChild(newComment);
  commentInput.value = '';
}

const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
