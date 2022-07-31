const initialList = document.getElementById("initial-page-list");
const addedFilms = document.getElementById("added-films");
const length = localStorage.length;
let html = "";

for (let i = 0; i < length; i++) {
  let filmID = window.localStorage.getItem(localStorage.key(i));
  fetch(`https://www.omdbapi.com/?apikey=3202104c&i=${filmID}`)
    .then((res) => res.json())
    .then((data) => {
      html += `
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
                                <img class="icon" src='Icon-.png'><a onclick='remove(event)'>Remove</a>
                            </div>
                        </div>
                        <div class="film-plot">
                            <p>${data.Plot}</p>
                        </div>
                        </div>
                </div>
                `;
      addedFilms.innerHTML = html;
    });
  initialList.style.display = "none";
}

function remove(event) {
  const movie =
    event.target.parentElement.parentElement.parentElement.parentElement;
  const movieId = movie.getAttribute("id");
  movie.style.display = "none";
  localStorage.removeItem(movieId);
  if (localStorage.length === 0) {
    initialList.style.display = "block";
  }
}
