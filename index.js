var apikey = "d1b898bb9f32f112ac2ba505b3cdbd73";
var city = "Sacramento"
const searchButton = $("#searchBtn");
var cityHistoryList = [];

// This is getting information from the api and putting it into the console when you search for a city
const currentWeatherChoice = (cityName) => {
   
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
    
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    var currentTitle = $("#current-title")
    var currentDay = moment().format("M/D/YYYY");
    currentTitle.text(`${cityName} (${currentDay})`);
    $("#current-temp").text("Temperature: " + data.main.temp)
    $("#current-humid").text("Humidity: " + data.main.humidity)
    $("#current-wind").text("Wind Speed: " + data.wind.speed)
   
    console.log(data)
})

}

$("#search-form").on("submit",function(event) { 
    event.preventDefault();
    var cityName = $("#search-input").val().trim()
    currentWeatherChoice(cityName)
});
