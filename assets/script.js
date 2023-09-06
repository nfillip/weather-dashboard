//VARIABLES
var searchBar = $('#search-input');
var currentTemp;
var currentHumidity;
var currentWind;
var cityName;
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



//OPEN WEATHER MULTI DATA FORECAST
// fetch("https://api.openweathermap.org/data/2.5/forecast?zip=80525,us&appid=0b109490a04f6ac5f08e2b74233ac40b&units=imperial")
// .then(function (response) {
//  return response.json();
// })
// .then(function (data){
//  console.log(data);

// })

//FUNCTION
function currentWeather(city) {
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
 console.log(data);
 console.log("current City: " + city);
 console.log("current Temp: " + data.main.temp);
 console.log("current Humidity: " + data.main.humidity);
 console.log("current wind speed " + data.wind.speed + "mph");
})


}

//EVENT LISTENER
searchBar.keypress(function (event) {
    
    event.stopPropagation();
    if (event.keyCode === 13) {
        event.preventDefault();
        currentWeather(searchBar.val());
        console.log(searchBar.val());
    }
  });