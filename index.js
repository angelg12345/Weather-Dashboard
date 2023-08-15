var apikey = "d1b898bb9f32f112ac2ba505b3cdbd73";
var city = "Sacramento"
const cityInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#searchBtn");
var cityHistoryList = [];

// This is getting information from the api and putting it into the console when you search for a city
const currentWeatherChoice = (cityName) => {
    const cityName = cityInput.value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
    console.log(cityName)
fetch(apiUrl)
.then(function(response){
    return response.json();
    
})
}

searchButton.addEventListener("click", cityinfo);
