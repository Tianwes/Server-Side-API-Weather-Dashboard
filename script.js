$(document).ready(function () {
    // need to add .click func to btn look at prev class work
    $("#button-addon2").on("click", function () {

        var usersInput = $(".form-control").val();

        console.log(usersInput)

        var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";
        // var cnt = 5;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + usersInput + "&appid=" + APIKey;
// (need 5 day forecast api)
        // var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + usersInput + "&appid=" + APIKey;
        // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + usersInput + "&cnt=" + 3 + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

                var cityName = response.name;
                // var weatherIcon = (response.weather[0].icon);
                // 'utc' timezone or response.dt
                // var currentDate = utc(year: number, month: number): DateTime;
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                var humidity = response.main.humidity;
                var wind = response.wind.speed;
                const iconName = response.weather[0].icon // this will hold the icon
                var iconApi = ('http://openweathermap.org/img/w/' + iconName + '.png')
                var iconImage = $("<img>").attr("src", iconApi);



                $(".chosen-city").text(cityName);
                $(".chosen-city").append(iconImage)
                // $(".current-date").text(currentDate);
                $("#city-temp").text("Current temp: " + tempF.toFixed(1) + "\xB0");
                $("#humidity").text("Humidity: " + humidity + "%");
                $("#wind").text("Wind-speed: " + wind) + " MPH";


        });

        // const DateTime = luxon.DateTime;
        // console.log(DateTime)

        // const dt = DateTime.fromISO(new Date().toISOString());
        // console.log(dt)
        // console.log(dt)
        // var day = (dt.toFormat('EEEE, MMMM yyyy'));
        // $("#currentDay").text(day + "  @  " + time).css('font-weight', '400');

    })


});