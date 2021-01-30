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

            // createElements(cityOBJMain);
            // event.preventDefault();
            // cityStorage(usersInput);
            // clearRow();
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

            // $(".city-info-div").empty().append(card.append(cardBody.append(cardTitle, currentTemp, humidity, windSpeed, uvIndex)))
            cityOBJMain = {
                // Main City display 
                // cityOBJMain[0].whatever 
                city: cityName,
                // icon: iconImage,
                temp: response.current.temp,
                humid: response.current.humidity,
                wind: response.current.wind_speed,
                uvIndex: response.current.uvi
            };
            console.log(cityOBJMain.city);

            for (var i = 1; i < 6; i++) {
                forecastOBJ = {
                    // Five-day-forecast cards 
                    // cityOBJMain[1].whatever 
                    // date: response.daily[i].dt,
                    icon: response.daily[i].weather[0].icon,
                    temp: response.daily[i].temp.max,
                    humid: response.daily[i].humidity,
                    wind: response.daily[i].wind_speed,
                    uvIndex: response.daily[i].uvi
                };
            };
            
            localStorage.setItem("mainCityInfo", JSON.stringify(cityOBJMain));
            localStorage.setItem("forecastInfo", JSON.stringify(forecastOBJ));
            getResponses(cityOBJMain, forecastOBJ);

            // console.log(cityOBJMain)
            //  console.log(forecastOBJ)
        });
        
    };

    function getResponses(cityOBJ, fiveDayOBJ) {
        // var cityStr = JSON.stringify(cityOBJMain)
        
          

        var card = $("<div>").addClass("card city-div");
        var cardBody = $("<div>").addClass("card-body");
        // var cardTitle = $("<h2>").addClass("card-title");
        var currentTemp = $("<p>").addClass("card-temp").text(cityOBJ.temp);
        // var humidity = $("<p>").addClass("humidity");
        // var windSpeed = $("<p>").addClass("wind");
        // var uvIndex = $("<p>").addClass("wind");
        $(".city-info-div").append(card.append(cardBody.append(currentTemp)))
        // $("#hour-9 .textBox").val(localStorage.getItem("hour-9"));
        // console.log(cityOBJMain[1].temp)

           // Five-day-forecast cards 
        // var card = $("<div>").addClass("card col-2");
        // var cardBody = $("<div>").addClass("card-body");
        // var cardTitle = $("<h4>").addClass("card-title").text(luxon.DateTime.fromMillis(response.daily[i].dt));
        // var iconArr = response.daily[i].weather[0].icon;
        // var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')
        // var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi);
        // var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
        // var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");
        // // $(".forecast-cards-row").empty();
        // $(".forecast-cards-row").append(card.append(cardBody, cardTitle, cardIcon, cardTemp, cardHumidity));
}
    

    

    function prependLiItem(item) {
        var cityListArr = [];
        var count = $(".list-group").children().length;
        // if (count >= 4) {
        //     cityListArr.push(item)

        // } else {
        //     cityListArr.pop(item)
        // }
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

    // function clearRow() {
    //     $(".forecast-cards-row").empty();
    //     var usersInput = $(".form-control").val();
    // }

})