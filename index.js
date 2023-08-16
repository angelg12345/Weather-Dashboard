var apikey = "d1b898bb9f32f112ac2ba505b3cdbd73";
var city = "Sacramento"
const searchButton = $("#searchBtn");
var cityHistoryList = [];


var searchHistory = (cityName) => {
    $('.past-search').filter(function() {
        return $(this).text() === cityName;
    }).remove();

    var searchHistoryentry = $("<p>");
    searchHistoryentry.addClass("past-search");
    searchHistoryentry.text(cityName);

    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");

    searchEntryContainer.append(searchHistoryentry);

    var searchHistoryContainer = $("#search-history-cont");
    searchHistoryContainer.append(searchEntryContainer);

    if (cityHistoryList.length > 0){
        var previousSavedSearch = localStorage.getItem("cityHistoryList");
        cityHistoryList = JSON.parse(previousSavedSearch)
    }

    cityHistoryList.push(cityName);
    localStorage.setItem("cityHistoryList", JSON.stringify(cityHistoryList))
}


var loadSearchhist = () => {
    var cityHistoryList = localStorage.getItem("cityHistoryList");

    if (!cityHistoryList){
        return false;
    }

    cityHistoryList = JSON.parse(cityHistoryList)
}





// This is getting information from the api and putting it into the console when you search for a city
const currentWeatherChoice = (cityName) => {
   
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
    
fetch(apiUrl)
.then(response => response.json())
.then(data => {

    var currentWeatherContainer = $("#current-Weather");
    currentWeatherContainer.addClass("current-Weather ");

    var currentTitle = $("#current-title")
    var currentDay = moment().format("M/D/YYYY");
    currentTitle.text(`${cityName} (${currentDay})`);

    var currentIcon = $("#current-weather-icon");
    currentIcon.addClass("current-weather-icon")
    var currentIconCode = data.weather[0].icon;
    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);
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
    searchHistory(cityName)

});

$("#search-history-cont").on("click", "p", function(){
    var previousCity = $(this).text();
    currentWeatherChoice(previousCity);

    var previousCityClicked = $(this);
    previousCityClicked.remove();
})
loadSearchhist()