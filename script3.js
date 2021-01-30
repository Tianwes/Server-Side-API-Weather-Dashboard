$(document).ready(function () {
    // (Current weather api)
    var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";

    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 13) {  //clicked enter
            $('#button-addon2').click(); //do click
        }
    })

    $("#button-addon2").on("click", function (event) {
        // add enter button keyup func 
        var usersInput = $(".form-control").val();

        if (!usersInput) {
            return;
        } else {
            searchWeather(usersInput);
            prependLiItem(usersInput)
            clearRow();
            // createElements(cityOBJMain);
            // event.preventDefault();
            // cityStorage(usersInput);
            
        }
    });

    function searchWeather(name) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + name + "&appid=" + APIKey + "&units=imperial";

        // Main City Card 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            // var cityName = localStorage.setItem(response.name);
            setResponses(response.coord.lat, response.coord.lon, response.name);
        });
    }

    function setResponses(lat, lon, cityName) {
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            cityOBJMain = [
                // Main City display 
                // cityOBJMain[0].whatever 
               {city: cityName},
                {icon: response.current.weather[0].icon},
                {temp: response.current.temp},
                {humid: response.current.humidity},
                {wind: response.current.wind_speed},
                {uvIndex: response.current.uvi}
            ];
            
            for (var i = 1; i < 6; i++) {
                // console.log(response)
                var card = $("<div>").addClass("card col-2");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h4>").addClass("card-title").text(luxon.DateTime.fromMillis(response.daily[i].dt));

                var iconArr = response.daily[i].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')

                var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
                var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
                var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");

                
            var getDate = localStorage.getItem("forecastDate");
            console.log(getDate)
             $(".forecast-cards-row").append(card.append(cardBody, cardTitle, cardIcon, cardTemp, cardHumidity));   

 }           
             localStorage.setItem("forecastDate", (cardTitle.text()));

            // console.log(forecastOBJ)
            localStorage.setItem("mainCityInfo", JSON.stringify(cityOBJMain));
            // localStorage.setItem("forecastInfo", JSON.stringify(forecastOBJ));
            getResponses(cityOBJMain);

            console.log(cityOBJMain)
            
             
        });
        
    };

    function getResponses(cityOBJ) {
        var mainCityStr = JSON.parse(localStorage.getItem("mainCityInfo"));
       
          var city = mainCityStr[0].city;
          var iconApi = ('http://openweathermap.org/img/w/' + mainCityStr[1].icon + '.png');
          var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
          var temp = mainCityStr[2].temp;
          var humidity = mainCityStr[3].humid;
          var wind = mainCityStr[4].wind;
          var UV = mainCityStr[5].uvIndex;

        var card = $("<div>").addClass("card city-div");
        var cardBody = $("<div>").addClass("card-body");
        var cardTitle = $("<h2>").addClass("card-title").text(city + " Date");
        var currentTemp = $("<p>").addClass("card-temp").text("Temperature: " + temp + " \xB0" + "F");
        var humidity = $("<p>").addClass("humidity").text("Humidity: " + humidity + " %");
        var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + wind + " MPH");
        var uvIndex = $("<p>").addClass("wind").text("UV-Index: " + UV);
        $(".city-info-div").append(card.append(cardBody.append(cardTitle, cardIcon, currentTemp, humidity, windSpeed, uvIndex)))
       
    
    }
    

    

    function prependLiItem(item) {
        var cityListArr = [];
        var count = $(".list-group").children().length;
        // have to pass in array somewhere ??? 
        var newCity = $("<li>").addClass("list-group-item").text(item);
        $(".list-group").prepend(newCity)
        // var item = $(".form-control").val();
        $('.form-control').val('');
        // var count = $(".list-group").children().length;
        // cityListArr.push(item)
        //  HAS to be an array - pop the last item in array
        // what should i do with the aray? push or pop li items?
        // ul length = 8 ?
        // while (count > 8)
    }


    // function createElements(obj) {
    //     // Main City display 
    //     var obj = cityOBJMain;
    //     // JSON.localStorage(key, thingy) then;
    //     // set text of $("whatevs") to getLocalStorage

    //     var card = $("<div>").addClass("card city-div");
    //     var cardBody = $("<div>").addClass("card-body");
    //     var cardTitle = $("<h2>").addClass("card-title").text(obj);
    //     // var cardDate 
    //     var temp = cityOBJMain[0].temp;
    //     var currentTemp = $("<p>").addClass("card-temp").text("Temperature: " + temp.toFixed(1) + " \xB0" + "F");
    //     var humidity = $("<p>").addClass("humidity").text("Humidity: " + response.current.humidity + " %");
    //     var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
    //     var uvIndex = $("<p>").addClass("wind").text("UV Index: " + response.current.uvi)
    //     // uvIndex 

    //     // Five-day-forecast cards 
    //     var card = $("<div>").addClass("card col-2");
    //     var cardBody = $("<div>").addClass("card-body");
    //     var cardTitle = $("<h4>").addClass("card-title").text(luxon.DateTime.fromMillis(response.daily[i].dt));
    //     var iconArr = response.daily[i].weather[0].icon;
    //     var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')
    //     var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
    //     var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
    //     var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");
    //     // $(".forecast-cards-row").empty();
    //     $(".forecast-cards-row").append(card.append(cardBody, cardTitle, cardIcon, cardTemp, cardHumidity));
    // }

    function clearRow() {
        $(".city-info-div").empty();
        $(".forecast-cards-row").empty();
        var usersInput = $(".form-control").val();
    }

})