$(document).ready(function () {
    $("#button-addon2").on("click", function () {
        // add enter button keyup func 
        var usersInput = $(".form-control").val();

        // for each new input create new li el and prepend
        var newLi = $('<li>').addClass("list-group-item");
        $(".list-group").first().css("background-color", "blue")
        $(newLi).text(usersInput);
        $(".list-group").prepend(newLi);


        $(function () {
            $(".list-group").css('cursor', 'pointer')

                .click(function () {
                    // get from localStorage 
                    console.log("click")
                });
        });


        var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";
        // (Current weather api)

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + usersInput + "&appid=" + APIKey;

        // Main City Card 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            var cityName = response.name;
            // Luxon current Date
            // Doesn't change with city
            // const DateTime = luxon.DateTime;
            // const dt = DateTime.fromISO(new Date().toISOString());
            // const currentDate = dt.toLocaleString(DateTime.DATETIME_SHORT);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var humidity = response.main.humidity;
            var wind = response.wind.speed;
            const iconName = response.weather[0].icon // this will hold the icon
            var iconApi = ('http://openweathermap.org/img/w/' + iconName + '.png')
            var iconImage = $("<img>").attr("src", iconApi);

            $(".chosen-city").text(cityName);
            $(".chosen-city").append(iconImage)
            // $(".current-date").text(currentDate);
            $("#city-temp").text("Current temp: " + tempF.toFixed(1) + " \xB0" + "F");
            $("#humidity").text("Humidity: " + humidity + "%");
            $("#wind").text("Wind-speed: " + wind + " MPH");
            //    UV Index is below second ajax call 

            var cityOBJ = {
                city: usersInput,
                temp: tempF,
                humid: humidity,
                windSpeed: wind,
                icon: iconImage,

            }

            var cityStr = JSON.stringify(cityOBJ)
            localStorage.setItem("cityInfo", cityStr);
            console.log(cityStr)
            var cityParsed = JSON.parse(localStorage.getItem("cityInfo"))
            console.log(cityParsed)

            // This works 
            // $(".chosen-city").text(cityParsed.city)

            var cityLat = response.coord.lat;
            var cityLon = response.coord.lon;

            // Five-day forecast API
           

                // UV Index 
                var uvIndex = response.current.uvi;
                $("#uv-index").text("UV-Index: " + uvIndex);

                // var fiveDayOBJ = {

                // }

                // for loop/ .each? to go thru days 1-5
                // 5 day forecast cards - dates
                var cardOneDate = response.daily[1].dt;
                var cardTwoDate = response.daily[2].dt;
                var cardThreeDate = response.daily[3].dt;
                var cardFourDate = response.daily[4].dt;
                var cardFiveDate = response.daily[5].dt;

                // console.log(cardOneDate)
                // Text for card dates 
                // If I use Luxon, How do I do dates in future? 
                $(".day-1").text(cardOneDate)
                $(".day-2").text(cardTwoDate)
                $(".day-3").text(cardThreeDate)
                $(".day-4").text(cardFourDate)
                $(".day-5").text(cardFiveDate)

                // 5 day forecast cards - icons
                var cardOneIcon = response.daily[0].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + cardOneIcon + '.png')
                var iconImage = $("<img>").attr("src", iconApi);
                $(".day-1-icon").append(iconImage);
                var cardOneIcon = response.daily[1].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + cardOneIcon + '.png')
                var iconImage = $("<img>").attr("src", iconApi);
                $(".day-2-icon").append(iconImage);
                var cardOneIcon = response.daily[2].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + cardOneIcon + '.png')
                var iconImage = $("<img>").attr("src", iconApi);
                $(".day-3-icon").append(iconImage);
                var cardOneIcon = response.daily[3].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + cardOneIcon + '.png')
                var iconImage = $("<img>").attr("src", iconApi);
                $(".day-4-icon").append(iconImage);
                var cardOneIcon = response.daily[4].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + cardOneIcon + '.png')
                var iconImage = $("<img>").attr("src", iconApi);
                $(".day-5-icon").append(iconImage);

                var cardOneMaxTemp = (response.daily[0].temp.max - 273.15) * 1.80 + 32;
                var cardTwoMaxTemp = (response.daily[1].temp.max - 273.15) * 1.80 + 32;
                var cardThreeMaxTemp = (response.daily[2].temp.max - 273.15) * 1.80 + 32;
                var cardFourMaxTemp = (response.daily[3].temp.max - 273.15) * 1.80 + 32;
                var cardFiveMaxTemp = (response.daily[4].temp.max - 273.15) * 1.80 + 32;

                $(".card-1-temp").text(cardOneMaxTemp.toFixed(2) + " \xB0" + "F")
                $(".card-2-temp").text(cardTwoMaxTemp.toFixed(2) + " \xB0" + "F")
                $(".card-3-temp").text(cardThreeMaxTemp.toFixed(2) + " \xB0" + "F")
                $(".card-4-temp").text(cardFourMaxTemp.toFixed(2) + " \xB0" + "F")
                $(".card-5-temp").text(cardFiveMaxTemp.toFixed(2) + " \xB0" + "F")

                var cardOneHumidity = response.daily[0].humidity;
                var cardTwoHumidity = response.daily[1].humidity;
                var cardThreeHumidity = response.daily[2].humidity;
                var cardFourHumidity = response.daily[3].humidity;
                var cardFiveHumidity = response.daily[4].humidity;

                $(".card-1-humidity").text("Humidity: " + cardOneHumidity + "%");
                $(".card-2-humidity").text("Humidity: " + cardTwoHumidity + "%");
                $(".card-3-humidity").text("Humidity: " + cardThreeHumidity + "%");
                $(".card-4-humidity").text("Humidity: " + cardFourHumidity + "%");
                $(".card-5-humidity").text("Humidity: " + cardFiveHumidity + "%");



            });
        })
        // const DateTime = luxon.DateTime;
        // console.log(DateTime)

        // const dt = DateTime.fromISO(new Date().toISOString());
        // console.log(dt)
        // var day = (dt.toFormat('EEEE, MMMM yyyy'));
        // $("#currentDay").text(day + "  @  " + time).css('font-weight', '400');

    })


    function getFiveDayForecast(){
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }

});

// NOTES *********************************************************************
// for loop for 5 days (day after today [1-5])
// OR .each (put cards in array)