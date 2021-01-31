$(document).ready(function () {
  
    var APIKey = "ddfbe236a05b76a6b3c7b48611dca40b";
    getStoredOBJ();
    // fiveDayStorage(getDate);
    
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

            for (var i = 1; i < 6; i++) {
                // console.log(response)
                var card = $("<div>").addClass("card col-2 bg-primary ms-4");
                var cardBody = $("<div>").addClass("card-body w-25");
                // var time = (dt.toFormat('hh:mm a'));
                // $("#currentDay").text(day + "  @  " + time).css('font-weight', '400');
                var cardDate = luxon.DateTime.fromObject(response.daily[i].dt)
                var day = (cardDate.toFormat('EEEE, mm yy'));
                var cardTitle = $("<h5>").addClass("card-title").text(day);
                var iconArr = response.daily[i].weather[0].icon;
                var iconApi = ('http://openweathermap.org/img/w/' + iconArr + '.png')
                var cardIcon = $("<img>").addClass("card-icon").attr("src", iconApi,).css({ 'width': '50px', 'height': '50px' });;
                var cardTemp = $("<p>").addClass("card-temp").text("Temp: " + response.daily[i].temp.max + " \xB0" + "F");
                var cardHumidity = $("<p>").addClass("card-humid").text("Humidity: " + response.daily[i].humidity + " %");
                
                $(".forecast-cards-row").append(card.append(cardBody, cardTitle, cardIcon, cardTemp, cardHumidity));
            }
            var getDate = localStorage.getItem("forecastDate");
            localStorage.setItem("forecastDate", (cardTitle.text()));
            // console.log(forecastOBJ)
            localStorage.setItem("mainCityInfo", JSON.stringify(cityOBJMain));
            
            // localStorage.setItem("forecastInfo", JSON.stringify(forecastOBJ));
            getStoredOBJ(cityOBJMain);
            // fiveDayStorage(getDate);
            // console.log(cityOBJMain)
        });
    };
    // function fiveDayStorage(item){
       
    // }

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
        var cardTitle = $("<h2>").addClass("card-title").text(city + " Date");
        var currentTemp = $("<p>").addClass("card-temp").text("Temperature: " + temp + " \xB0" + "F");
        console.log(currentTemp)
        var humidity = $("<p>").addClass("humidity").text("Humidity: " + humidity + " %");
        var windSpeed = $("<p>").addClass("wind").text("Wind Speed: " + wind + " MPH");
        var uvIndex = $("<p>").addClass("wind").text("UV-Index: " + UV);
        $(".city-info-div").append(card.append(cardBody.append(cardTitle, cardIcon, currentTemp, humidity, windSpeed, uvIndex)))


    }




    function prependLiItem(item) {

        const searchedCityarr = [];
        // have to pass in array somewhere ??? 
        var newCity = $("<li>").addClass("list-group-item").text(item);
        $('.form-control').val('');
        $(".list-group").prepend(newCity).on("click", function () {




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