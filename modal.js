const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

let currentMovie = {};

background.addEventListener("click", function () {
  overlay.classList.remove("open");
});

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie["imdbID"])) {
    notie.alert({ type: "error", text: "Movie already on the list" });
    return;
  }
  addFilmToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  overlay.classList.remove("open");
}

function createModalContainer(responseJson) {
  currentMovie = responseJson;

  modalContainer.innerHTML = `
    <h2 id="movie-title">${responseJson["Title"]} - ${responseJson["Year"]}</h2>
    <section id="modal-body">
      <img
        id="movie-poster"
        src="${responseJson["Poster"]}"
        alt="Film poster"
      />
      <div id="movie-info">
        <h3 id="movie-h3lot">
          ${responseJson["Plot"]}
        </h3>
        <div id="movie-cast">
          <h4>Cast:</h4>
          <h5>${responseJson["Actors"]}</h5>
        </div>
        <div id="movie-genre">
          <h4>Gender:</h4>
          <h5>${responseJson["Genre"]}</h5>
        </div>
      </div>
    </section>
    <section id="modal-footer">
      <button id="add-to-list" onclick="{addCurrentMovieToList()}">Add to List</button>
    </section>`;
}
// createModalContainer();
