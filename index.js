const inputEl = document.getElementById("text-search");
const searchButton = document.getElementById("search-button");
const mainContent = document.getElementById("main-content");
const mainList = document.getElementById("main-list");
const form = document.getElementById("search-bar");
const foundFilm = document.getElementById("found-film");
const initialPage = document.getElementById("initial-page");
const errorMessage = document.getElementById("error");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(`https://www.omdbapi.com/?apikey=3202104c&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      initialPage.style.display = "none";
      if (data.Response === "False") {
        mainContent.style.paddingTop = "5rem";
        errorMessage.style.display = "block";
        foundFilm.style.display = "none";
        errorMessage.innerHTML += `
                <h3 class='text-error'>Unable to find what you’re looking for. Please try another search.</h3>`;
      }
      let filmsHtml = "";
      for (let i = 0; i < 8; i++) {
        let filmId = data.Search[i].imdbID;

        fetch(`https://www.omdbapi.com/?apikey=3202104c&i=${filmId}`)
          .then((res) => res.json())
          .then((data) => {
            mainContent.style.paddingTop = "0";
            filmsHtml += `
                    <div class="film-card" id='${data.imdbID}'>
                        <div class="film-poster">
                            <img class="poster" src=${data.Poster} alt='Poster of ${data.Title}'>
                        </div>
                        <div class="film-text">
                            <div class="film-title">
                                <h3 class='title'>${data.Title}</h3>
                                <div class='rating'>
                                    <img clas='star-icon' src='star.png'><p>${data.imdbRating}</p>
                                </div>
                            </div>
                            <div class="film-info">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <div class='link'>
                                    <img class="icon" src='Icon+.png'><a onclick='addToWatchlist(event)'>Watchlist</a>
                                </div>
                            </div>
                            <div class="film-plot">
                                <p>${data.Plot}</p>
                            </div>
                         </div>
                    </div>
                    `;
            foundFilm.style.display = "block";
            errorMessage.style.display = "none";
            foundFilm.innerHTML = filmsHtml;
          });
      }
    });
});

function addToWatchlist(event) {
  const movie =
    event.target.parentElement.parentElement.parentElement.parentElement;
  const movieId = movie.getAttribute("id");
  localStorage.setItem(movieId, movieId);
}
