//VARIABLES
var searchBar = $('#search-input');
var currentTemp;
var currentHumidity;
var currentWind;
var cityName;
var currentCardTitle = $("#current-card-title");
var currentCardTemp = $("#current-card-temp");
var currentCardHumidity = $("#current-card-humidity");
var currentCardWind = $("#current-card-wind");
var currentCardIcon = $("#current-card-icon");
var fiveDayCards = $("#five-day-cards");
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}





//FUNCTION
function fetchData(city) {
    //OPEN WEATHER CURRENT FORECAST
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0b109490a04f6ac5f08e2b74233ac40b&units=imperial") 
.then(function(response){
 if (response.status === 404) {
    console.log("404 error");
} else {
    cityName = city;
}  
return response.json();
})
.then(function (data) {
displayCurrentWeather(data)
 
})


//OPEN WEATHER MULTI DATA FORECAST
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0b109490a04f6ac5f08e2b74233ac40b&units=imperial")
.then(function (response) {
    if (response.status === 404) {
        console.log("404 error");
    } else {
      return response.json();  
    }
    
    })
    .then(function (dataFiveDay) {
        console.log(dataFiveDay);
    display5DayForecast(dataFiveDay)
     
    })
}
//displays current weather
function displayCurrentWeather(data){
    console.log(data);
    console.log("current City: " + cityName);
    console.log("current Temp: " + data.main.temp);
    console.log("current Humidity: " + data.main.humidity);
    console.log("current wind speed " + data.wind.speed + "mph");
    console.log(data.weather[0].icon);
    var x = "https://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";
    currentCardIcon.attr("src", x );
    currentCardTitle.text("Current City: " + cityName)
    currentCardTemp.text("current Temp: " + data.main.temp);
    currentCardHumidity.text("current Humidity: " + data.main.humidity);
    currentCardWind.text("current wind speed " + data.wind.speed + "mph");
}

//displays 5 day forecast
function display5DayForecast(dataFiveDay){
     for(var x = 0 ; x<5 ; x++){
        console.log(5)
        console.log(dataFiveDay.list[x+8].main.temp)
;       $("#temp" +x).text(dataFiveDay.list[x+8].main.temp + "F")
        $("#humidity" +x).text(dataFiveDay.list[x+8].main.humidity + "%")
        $("#wind" +x).text(dataFiveDay.list[x+8].wind.speed + "mph")
        var dateDay = new Date();
        dateDay.setDate(dateDay.getDate() +(x+1))
        $("#date" +x).text(dateDay.getMonth() + 1 + "/" + dateDay.getDate() +"/" + dateDay.getFullYear())
        console.log(dataFiveDay.list[x+8].weather[0].icon)
        var y = "https://openweathermap.org/img/wn/" + dataFiveDay.list[x+8].weather[0].icon +"@2x.png";
        $("#icon" + x).attr("src" , y )
    
    }
        resetInput();
}

//resets input box
function resetInput(){
    console.log(50);
    searchBar.val("");
}
//EVENT LISTENER
searchBar.keypress(function (event) {
    
    event.stopPropagation();
    if (event.keyCode === 13) {
        event.preventDefault();
        fetchData(searchBar.val());
        
        console.log(searchBar.val());
    }
  })