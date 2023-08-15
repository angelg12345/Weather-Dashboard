var apikey = "d1b898bb9f32f112ac2ba505b3cdbd73";
var city = "Sacramento"
const cityInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#searchBtn");
var cityHistoryList = [];


const cityCoords = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;
    console.log(apikey)
    console.log(cityName)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`

    console.log("Fetching data from:", apiUrl);

    fetch(apiUrl)
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("Parsed JSON data:", data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

searchButton.addEventListener("click", cityCoords);
