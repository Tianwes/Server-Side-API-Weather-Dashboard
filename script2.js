$(document).ready(function () {
    var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";
    // (Current weather api)


    $("#button-addon2").on("click", function () {
        // add enter button keyup func 
        var usersInput = $(".form-control").val();
        console.log(usersInput);
        searchWeather(usersInput);
        // call uvIndex function here 
        // call list function here 
    });

    function searchWeather(name) {
        console.log(name)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + name + "&appid=" + APIKey + "&units=imperial";

        // Main City Card 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var card = $("<div>").addClass("card city-div");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h2>").addClass("card-title").text(response.name);
            // var cardDate 
            var temp = response.main.temp_max;
            var currentTemp = $("<p>").addClass("card-temp").text("Temperature: " + temp.toFixed(1) + " \xB0" + "F");
            var humidity = $("<p>").addClass("humidity").text("Humidity: " + response.main.humidity + " %");
            var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + response.wind.speed + " MPH");
            // var uvIndex = $("<p>").addClass("wind").text("UV Index: " + response.daily[i].uvi)
            // uvIndex 

            $(".city-info-div").append(card.append(cardBody.append(cardTitle, currentTemp, humidity, windSpeed)))

            fiveDayForecast(response.coord.lat, response.coord.lon);

        });
    }

    function fiveDayForecast(lat, lon) {
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 1; i < 6; i++) {
                console.log(response)
                var card = $("<div>").addClass("card col-2");
                var cardTitle = $("<h4>").addClass("card-title").text(luxon.DateTime.fromMillis(response.daily[i].dt));
                var iconArr = response.daily[i].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')
                var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
                var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
                var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");

                $(".forecast-cards-row").append(card.append(cardTitle, cardIcon, cardTemp, cardHumidity));

            }

            // var uvIndex = $("<p>").addClass("wind").text("UV Index: " + response.current.uvi);
            // $(".wind").append(uvIndex);

        })

    }

    // function appendUVI(lat, lon) {
    //     var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

    //     $.ajax({
    //         url: fiveDayURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response)
    //         var uvIndex = $("<p>").addClass("wind").text("UV Index: " + response.current.uvi);
    //         $(".wind").append(uvIndex);
    //     });
    // };

})