const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0af190b937ba74d7e34233115d31313&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c0af190b937ba74d7e34233115d31313&page=1&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const home = document.getElementById('home')
const loadMoreBtn = document.getElementById('load-more')

let currentPage = 1;

// Function to load more movies
function loadMoreMovies() {
    currentPage++;
    getMovies(API_URL + currentPage);
}


//get initial movies
getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}



function showMovies(movies){
    main.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML= `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `

        main.appendChild(movieEl)
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >=5){
        return 'orange'
    }else {
        return 'red'
    }
}

loadMoreBtn.addEventListener('click', loadMoreMovies); // Attach the loadMoreMovies function to the button click event

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }else{
        window.location.reload()
    }
    
})

home.addEventListener('click', () => {
    window.location.reload()
})