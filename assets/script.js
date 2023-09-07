$(function () {
  //VARIABLES
  var searchBar = $("#search-input");
  var currentTemp;
  var currentHumidity;
  var currentWind;
  var cityName = "Fort Collins";
  var currentCardTitle = $("#current-card-title");
  var currentCardTemp = $("#current-card-temp");
  var currentCardHumidity = $("#current-card-humidity");
  var currentCardWind = $("#current-card-wind");
  var currentCardIcon = $("#current-card-icon");
  var fiveDayCards = $("#five-day-cards");
  var divSideBar = $("#div-side-bar");
  var quickLinks = $("#quick-link");
  var recentSearchArray = [];

  //FUNCTIONS
  //function: fetching data
  function fetchData(city) {
    //OPEN WEATHER CURRENT FORECAST
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=0b109490a04f6ac5f08e2b74233ac40b&units=imperial"
    )
      .then(function (response) {
        if (response.status === 404) {
          console.log("404 error");
        } else {
          cityName = city;
          addToLocalStorage(city);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayCurrentWeather(data);
      });
    //OPEN WEATHER MULTI DATA FORECAST
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=0b109490a04f6ac5f08e2b74233ac40b&units=imperial"
    )
      .then(function (response) {
        if (response.status === 404) {
          console.log("404 error");
        } else {
          return response.json();
        }
      })
      .then(function (dataFiveDay) {
        console.log(dataFiveDay);
        display5DayForecast(dataFiveDay);
      });
  }
  //displays current weather
  function displayCurrentWeather(data) {
    // console.log(data);
    // console.log("current City: " + cityName);
    // console.log("current Temp: " + data.main.temp);
    // console.log("current Humidity: " + data.main.humidity);
    // console.log("current wind speed " + data.wind.speed + "mph");
    // console.log(data.weather[0].icon);
    var x =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    currentCardIcon.attr("src", x);
    currentCardTitle.text("Current City: " + cityName);
    currentCardTemp.text("current Temp: " + data.main.temp);
    currentCardHumidity.text("current Humidity: " + data.main.humidity);
    currentCardWind.text("current wind speed " + data.wind.speed + "mph");
  }

  //displays 5 day forecast
  function display5DayForecast(dataFiveDay) {
    for (var x = 0; x < 5; x++) {
      $("#temp" + x).text(dataFiveDay.list[x + 8].main.temp + "F");
      $("#humidity" + x).text(dataFiveDay.list[x + 8].main.humidity + "%");
      $("#wind" + x).text(dataFiveDay.list[x + 8].wind.speed + "mph");
      var dateDay = new Date();
      dateDay.setDate(dateDay.getDate() + (x + 1));
      $("#date" + x).text(
        dateDay.getMonth() +
          1 +
          "/" +
          dateDay.getDate() +
          "/" +
          dateDay.getFullYear()
      );

      var y =
        "https://openweathermap.org/img/wn/" +
        dataFiveDay.list[x + 8].weather[0].icon +
        "@2x.png";
      $("#icon" + x).attr("src", y);
    }
    resetInput();
  }

  //resets input box
  function resetInput() {
    searchBar.val("");
  }

  //LocalStorage Set
  function addToLocalStorage(inputValue) {
    console.log(inputValue);
    if (localStorage.getItem("recentSearches") === null) {
      console.log(6);
      localStorage.setItem("recentSearches", JSON.stringify([inputValue]));
    } else {
      console.log(5);
      var temp = JSON.parse(localStorage.getItem("recentSearches"));
      console.log(temp);
      if (temp.indexOf(inputValue) === -1) {
        temp.unshift(inputValue);
      }
      localStorage.setItem("recentSearches", JSON.stringify(temp));
      addLocalStorageToDisplay();
    }
  }

  //Add Local Storage to Display
  function addLocalStorageToDisplay() {
    console.log("calling to local storage display");
    if (localStorage.getItem("recentSearches") !== null) {
      var temp = JSON.parse(localStorage.getItem("recentSearches"));
      var count = 0;
      for (var x = 0; x < temp.length; x++) {
        if (count <= 4) {
          $("#recent-search-" + x).text(temp[x]);
        }
      }
    }
  }

  //EVENT LISTENERS
  searchBar.keypress(function (event) {
    event.stopPropagation();
    if (event.keyCode === 13) {
      event.preventDefault();
      fetchData(searchBar.val());
    }
  });

  $("#link-ul").on("click", "a", function () {
    var temp = $(this).text().trim();
    fetchData(temp);
   
  });
  //ON REFERSH IT DISPLAYS FOCO
 fetchData(cityName);
 
});
