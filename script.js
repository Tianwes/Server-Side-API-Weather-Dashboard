$(document).ready(function () {

    var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";
    // getStoredOBJ();

    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 13) {  //clicked enter
            $('#button-addon2').click(); //do click
        }
    })

    $("#button-addon2").on("click", function (event) {
        // add enter button keyup func 
        var usersInput = $(".form-control").val();

        if (!usersInput) {

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
            fiveDayCards(response.coord.lat, response.coord.lon, response.name);
        });
    }

    function fiveDayCards(lat, lon, cityName) {
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            cityOBJMain = [
                // Main City display 
                // cityOBJMain[0].whatever 
                { city: cityName },
                { icon: response.current.weather[0].icon },
                { temp: response.current.temp },
                { humid: response.current.humidity },
                { wind: response.current.wind_speed },
                { uvIndex: response.current.uvi }
            ];
            // I know this can be optimized but I couldn't get it to work with a for loop anything else...
            fiveDaysOBJ = [
                {
                    date: response.daily[1].dt,
                    icon: response.daily[1].weather[0].icon,
                    temp: response.daily[1].temp.max,
                    humidity: response.daily[1].humidity
                },
                {
                    date: response.daily[2].dt,
                    icon: response.daily[2].weather[0].icon,
                    temp: response.daily[2].temp.max,
                    humidity: response.daily[2].humidity
                },
                {
                    date: response.daily[3].dt,
                    icon: response.daily[3].weather[0].icon,
                    temp: response.daily[3].temp.max,
                    humidity: response.daily[3].humidity
                },
                {
                    date: response.daily[4].dt,
                    icon: response.daily[4].weather[0].icon,
                    temp: response.daily[4].temp.max,
                    humidity: response.daily[4].humidity
                },
                {
                    date: response.daily[5].dt,
                    icon: response.daily[5].weather[0].icon,
                    temp: response.daily[5].temp.max,
                    humidity: response.daily[5].humidity
                }

            ]
            localStorage.setItem("fiveDayOBJ", JSON.stringify(fiveDaysOBJ));

            for (var i = 1; i < 6; i++) {
                var card = $("<div>").addClass("card col-2 bg-primary ms-4");
                var cardBody = $("<div>").addClass("card-body w-25");
                var cardDate = luxon.DateTime.fromObject(response.daily[i].dt).plus({ days: i });
                var day = (cardDate.toFormat('M/d/yy'));
                var cardTitle = $("<h5>").addClass("card-title").text(day);
                var iconArr = response.daily[i].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')
                var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi,).css({ 'width': '50px', 'height': '50px' });;
                var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
                var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");

                $(".forecast-cards-row").append(card.append(cardBody, cardTitle, cardIcon, cardTemp, cardHumidity));
            }

            localStorage.setItem("mainCityInfo", JSON.stringify(cityOBJMain));

            getStoredOBJ(cityOBJMain);
        });
    };
   
    function getStoredOBJ(cityOBJ) {

        // Main city Info from obj 
        var cityOBJMain = JSON.parse(localStorage.getItem("mainCityInfo"));
        var city = cityOBJMain[0].city;
        var iconApi = ('http://openweathermap.org/img/w/' + cityOBJMain[1].icon + '.png');
        var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
        var temp = cityOBJMain[2].temp;
        var humidity = cityOBJMain[3].humid;
        var wind = cityOBJMain[4].wind;
        var UV = cityOBJMain[5].uvIndex;
        // main city card
        var card = $("<div>").addClass("card city-div");
        var cardBody = $("<div>").addClass("card-body");
        var currentDate = luxon.DateTime.local();
        var day = currentDate.toLocaleString(luxon.DateTime.DATETIME_SHORT);
        var cardTitle = $("<h2>").addClass("card-title").text(city + " (" + day + ") ");
        var currentTemp = $("<p>").addClass("card-temp").text("Temperature: " + temp + " \xB0" + "F");
        var humidity = $("<p>").addClass("humidity").text("Humidity: " + humidity + " %");
        var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + wind + " MPH");
        var uvIndex = $("<p>").addClass("wind").text("UV-Index: ");
        var uvSpan = $("<span>").addClass("uvIndexSpan").text(UV)
        $(".city-info-div").append(card.append(cardBody.append(cardTitle, cardIcon, currentTemp, humidity, windSpeed, uvIndex.append(uvSpan))))

        if(UV <= 2){
            $(uvSpan).css({"background-color": "green", "border-radius": "15%"})
        }else if(UV > 2 && UV <= 5 ){
            $(uvSpan).css({"background-color": "yellowgreen", "border-radius": "15%"})
        }else if(UV > 5 && UV <= 7){
            $(uvSpan).css({"background-color": "orangered", "border-radius": "15%"})
        }else if(UV > 7 && UV <= 10){
            $(uvSpan).css({"background-color": "red", "border-radius": "15%"})
        }
    }

    function prependLiItem(item) {

        // const searchedCityarr = [];
        // have to pass in array somewhere ??? 
        var newCity = $("<li>").addClass("list-group-item").text(item);
        $('.form-control').val('');
        $(".list-group").prepend(newCity).on("click", function () {
        console.log(cityOBJMain)
        })
        // var count = $(".list-group").children().length;
        // cityListArr.push(item)
        //  HAS to be an array - pop the last item in array
        // what should i do with the aray? push or pop li items?
        // ul length = 8 ?
        // while (count > 8)
    }

    function clearRow() {
        // if(city)
        $(".city-info-div").empty();
        $(".forecast-cards-row").empty();
        var usersInput = $(".form-control").val();
    }

})