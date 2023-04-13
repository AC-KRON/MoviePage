const global = {
  currentPage: window.location.pathname,
};

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = '05c9b2e6aa39ba730baaf8f6521316c0';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};

// Get Popular Movies

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `
        <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
        /> `
          : `
        
        <img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
        />`
      }
        </a>
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
};

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movies Details');
      break;
    case '/tv-details.html':
      console.log('Tv Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
