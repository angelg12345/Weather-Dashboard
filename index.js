var key = "d1b898bb9f32f112ac2ba505b3cdbd73";
var city = "Sacramento"

var cityHistory = [];

$('.search').on("click", function (event){
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if (city === "") {
        return;
    };
    cityHistory.push(city);
    
    localStorage.setItem('city', JSON.stringify(cityHistory));
    fiveForecast.empty();
    getHistory();
    getWeatherToday();
});

var cardBodyToday = $('.cardBodyToday')
function getWeatherToday(){
  var getURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

  $(cardBodyToday).empty();
}

function FivedayForecast(){
    
}

function initLoad() {

	
};

initLoad();