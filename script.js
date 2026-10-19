const weatherBtn = document.getElementById("weatherBtn");
const movieBtn = document.getElementById("movieBtn");

const weatherResult = document.getElementById("weatherResult");
const movieResult = document.getElementById("movieResult");

// Weather search
weatherBtn.addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  weatherResult.textContent = "Loading weather...";

  try {
    const response = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`
    );

    if (!response.ok) {
      throw new Error("Weather not found");
    }

    const data = await response.json();
    const current = data.current_condition[0];

    weatherResult.innerHTML = `
      <h2>${city}</h2>
      <p>Temperature: ${current.temp_C} °C</p>
      <p>Condition: ${current.weatherDesc[0].value}</p>
      <p>Humidity: ${current.humidity}%</p>
      <p>Wind Speed: ${current.windspeedKmph} km/h</p>
    `;
  } catch (error) {
    weatherResult.textContent =
      "Unable to load weather. Please try again.";
  }
});

// Movie search
movieBtn.addEventListener("click", async () => {
  const movie = document.getElementById("movie").value.trim();

  if (!movie) {
    movieResult.textContent = "Please enter a movie name.";
    return;
  }

  movieResult.textContent = "Loading movie...";

  try {
    const response = await fetch(
  `https://www.omdbapi.com/?apikey=544ad1a5&t=${encodeURIComponent(movie)}`
  );

    const data = await response.json();

    if (data.Response === "False") {
      movieResult.textContent = "Movie not found. Try another name.";
      return;
    }

    const poster =
      data.Poster && data.Poster !== "N/A"
        ? `<img src="${data.Poster}" alt="Movie poster">`
        : "";

    movieResult.innerHTML = `
      <h2>${data.Title}</h2>
      ${poster}
      <p>Year: ${data.Year}</p>
      <p>Rating: ${data.imdbRating}</p>
      <p>Released: ${data.Released}</p>
      <p>Genre: ${data.Genre}</p>
      <p>${data.Plot}</p>
    `;
  } catch (error) {
    movieResult.textContent =
      "Unable to load movie. Please try again.";
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("movie").value = "";
    document.getElementById("movieResult").innerHTML = "";
});
function updateDateTime() {
    document.getElementById("dateTime").textContent =
        new Date().toLocaleString();
}

updateDateTime();
setInterval(updateDateTime, 1000);
const movieHistory = document.getElementById("movieHistory");
const recentMovies = [];

document.getElementById("movieBtn").addEventListener("click", () => {
    const movieName = document.getElementById("movie").value.trim();

    if (movieName && !recentMovies.includes(movieName)) {
        recentMovies.unshift(movieName);

        if (recentMovies.length > 5) {
            recentMovies.pop();
        }

        movieHistory.innerHTML = "";

        recentMovies.forEach((name) => {
            const item = document.createElement("li");
            item.textContent = name;
            movieHistory.appendChild(item);
        });
    }
});