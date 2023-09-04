var apikey = "d1b898bb9f32f112ac2ba505b3cdbd73";

const searchButton = $("#searchBtn");
// Array to store search history
var cityHistoryList = [];

// function to add a city to the search history
var searchHistory = (cityName) => {
    // putting the past search to the cityName
    $('.past-search').filter(function() {
        return $(this).text() === cityName;
    }).remove();
// new search history entry
    var searchHistoryentry = $("<p>");
    searchHistoryentry.addClass("past-search");
    searchHistoryentry.text(cityName);

    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchHistoryentry);
// Append the entry to search history cont
    var searchHistoryContainer = $("#search-history-cont");
    searchHistoryContainer.append(searchEntryContainer);
// loading previous search hist from local storage
    if (cityHistoryList.length > 0){
        var previousSavedSearch = localStorage.getItem("cityHistoryList");
        cityHistoryList = JSON.parse(previousSavedSearch)
    }
// adding to array and saving the updated city history to local storage
    cityHistoryList.push(cityName);
    localStorage.setItem("cityHistoryList", JSON.stringify(cityHistoryList))
}

// function to load and display search hist
var loadSearchhist = () => {
    var cityHistoryList = localStorage.getItem("cityHistoryList");

    if (!cityHistoryList){
        return false;
    }

    cityHistoryList = JSON.parse(cityHistoryList)

    for (var i = 0; i < cityHistoryList.length; i++){
        searchHistory(cityHistoryList[i]);
    } 
}





// function to fetch and display current weather
const currentWeatherChoice = (cityName) => {
   
var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=imperial`
    
fetch(apiUrl)
.then(response => response.json())
.then(data => {

// filtering to get the current days date
    const currentDayForecasts = data.list.filter(forecast => {
        const forecastDate = moment.unix(forecast.dt).format("M/D/YYYY");
        const currentDay = moment().format("M/D/YYYY");
        return forecastDate === currentDay;
    });

if (currentDayForecasts.length > 0) {
    // updating weather cont with data
    var currentWeatherContainer = $("#current-Weather");
    currentWeatherContainer.addClass("current-Weather ");

    var currentTitle = $("#current-title")
    var currentDay = moment().format("M/D/YYYY");
    currentTitle.text(`${cityName} (${currentDay})`);

    var currentIcon = $("#current-weather-icon");
    currentIcon.addClass("current-weather-icon")
    var currentIconCode = currentDayForecasts[0].weather[0].icon;
    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);
    $("#current-temp").text("Temperature: " + currentDayForecasts[0].main.temp + " F");
    $("#current-humid").text("Humidity: " + currentDayForecasts[0].main.humidity + " % ");
    $("#current-wind").text("Wind Speed: " + currentDayForecasts[0].wind.speed + " MPH ");
   
    console.log(currentDayForecasts[0]);
}})

}
// fetching and displaying fiveday forecast 
var fiveDayForecast = (cityName) => {
    
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=imperial`)
                // get response from one call api and turn it into objects
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response);

           
        
            var fiveDayTitle = $("#fiveday-forecast-title");
            fiveDayTitle.text("5-Day Forecast:")
           
            for (var i = 0; i <= 5; i++){
                var forecast = response.list[i]
                if (!forecast || !forecast.weather || forecast.weather.length === 0) {
                    console.log('Forecast data is missing or incomplete for day ' + i);
                    continue;
                }
               
                var futureCard = $(".future-card").eq(i);
                futureCard.addClass("future-card-details")

                var futureDate = $("#future-date-" + i);
                        date = moment().add(i , "d").format("M/D/YYYY");
                        futureDate.text(date);

                        var futureIcon = $("#future-icon-" + i);
                        futureIcon.addClass("future-icon");
                        var futureIconCode = forecast.weather[0].icon;
                        futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);
            
                        var futureTemp = $("#future-temp-" + i);
                        futureTemp.text("Temp: " + forecast.main.temp + " F" );

                        var futureWind = $("#future-wind-" + i);
                        futureWind.text("Wind: " + forecast.wind.speed + " MPH ");

                        var futureHumidity = $("#future-humidity-" + i);
                        futureHumidity.text("Humidity: " + forecast.main.humidity + "%");

                       
            
            }
        })
        }

// event listener for search form submission
$("#search-form").on("submit",function(event) { 
    event.preventDefault();
    var cityName = $("#search-input").val().trim()
    currentWeatherChoice(cityName)
    fiveDayForecast(cityName)
    searchHistory(cityName)

});
// event listener for clicking a old search
$("#search-history-cont").on("click", "p", function(){
    var clickedCity = $(this).text();
    var clickedCityIndex = cityHistoryList.indexOf(clickedCity);

    if (clickedCityIndex !== -1) {
    //     Removing an pushing to the back of the array
        cityHistoryList.splice(clickedCityIndex, 1);

       
        cityHistoryList.push(clickedCity);

        
        localStorage.setItem("cityHistoryList", JSON.stringify(cityHistoryList));

    //   clear the container and reloading the history
        var searchHistoryContainer = $("#search-history-cont");
        searchHistoryContainer.empty();
        loadSearchhist();
        
    //    displaying the clicked city
        currentWeatherChoice(clickedCity);
        fiveDayForecast(clickedCity);
}})

loadSearchhist()