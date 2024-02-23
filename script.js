//Implement all your function here to make it a working application.
const form = document.getElementById("genreForm");
const genres = document.getElementById("genres");
const search = document.getElementById("playBtn");
const movieInfo = document.getElementById("movieInfo");
let moviePoster = document.getElementById("moviePoster");
let movieText = document.getElementById("movieText");
const nextBtn = document.getElementById("nextBtn");
const nextDiv = document.getElementById("nextDiv");
const prevBtn=document.getElementById("prevBtn");

const requestURL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=a2c71019e5db01a411d486619aaee7a9";

fetch(requestURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Link not found");
    } else {
      return response.json();
    }
  })
  .then((data) => {
    // data=user;
    console.log(data);
    populateDropdown(data.genres);
  })
  .catch((err) => {
    console.error(err);
  });

function populateDropdown(genreList) {
  genres.innerHTML = "";
  genreList.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genres.appendChild(option);
  });
}

search.addEventListener("click", () => searchMovie(genres.value));
let currentIndex = 0;

function searchMovie(selectedGenre) {
    currentIndex=0;
  const requestMovie = `https://api.themoviedb.org/3/discover/movie?api_key=a2c71019e5db01a411d486619aaee7a9&with_genres=${selectedGenre}`;
  fetch(requestMovie)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Link not found");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const movies = data.results;

      console.log(movies);
      displayMovie(movies[currentIndex]);
      updateButtons(movies);

      nextBtn.addEventListener("click", () => {
        currentIndex++;
        console.log(`next btn ${currentIndex}`);
        updateButtons(movies);
      });

      prevBtn.addEventListener('click',()=>{
        currentIndex--;
        console.log(`prev btn ${currentIndex}`);

        updateButtons(movies);
    });

    })
    .catch((err) => {
      console.error(err);
    });
}


function displayMovie(movie) {
  moviePoster.innerHTML = "";
  movieText.innerHTML = "";
  if (movie) {
    console.log(movie);
    const img = document.createElement("img");
    const heading = document.createElement("h2");
    const para = document.createElement("p");
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.setAttribute("src", poster);
    moviePoster.appendChild(img);
    para.textContent = movie.overview;
    para.setAttribute("id","movieOverview");
    heading.setAttribute("id","movieTitle");
    heading.textContent = movie.title;
    movieText.append(heading, para);
    movieInfo.append(moviePoster, movieText);
  }
}
function updateButtons(movies) {
    // Enable or disable Next/Prev buttons based on the current index
    if (currentIndex >= movies.length - 1) {
      nextBtn.setAttribute("hidden", "true");
    } else {
      nextBtn.removeAttribute("hidden");
      displayMovie(movies[currentIndex]);
    }
  
    if (currentIndex <= 0) {
      prevBtn.setAttribute("hidden", "true");
    } else {
      prevBtn.removeAttribute("hidden");
      displayMovie(movies[currentIndex]);

    }
  }