const overlay = document.getElementById("modal-overlay");
const searchButton = document.getElementById("searchButton");
const movieName = document.getElementById("movieName");
const movieYear = document.getElementById("movieYear");
const movieListContainer = document.getElementById("movie-list");

// Variable responsible to show the list on my movieListContainer
// let movieList = [];
// I will start this variable with the value from localStorage
// ??: if the left side of variable return "null", it will take the right
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

searchButton.addEventListener("click", async function () {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameToUrl()}${movieYearToUrl()}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data["Error"]) {
      throw new Error(data["Error"]);
    }
    createModalContainer(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
});

function movieNameToUrl() {
  if (movieName.value === "") {
    throw new Error("Please, provide the movie name");
  } else {
    return movieName.value.split(" ").join("+");
  }
}

function movieYearToUrl() {
  if (movieYear.value === "") {
    return "";
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Please, provide a valid year");
  } else {
    return `&y=${movieYear.value}`;
  }
}

function addFilmToList(filmObject) {
  movieList.push(filmObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject["imdbID"] === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += `<article id="movie-card-${movieObject["imdbID"]}">
  <img
    src="${movieObject["Poster"]}"
    alt="Poster of ${movieObject["Title"]}"
  />
  <button class="remove-button" onclick="removeFilmFromList('${movieObject["imdbID"]}')">
    <i class="bi bi-x-circle"></i> Remove
  </button>
</article>`;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: "Are you sure?",
    submitText: "Yes",
    cancelText: "No",
    position: "top",
    submitCallback: function removeMovie() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  // To stora as a string
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}
