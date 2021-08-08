// variables
    // open weather API
        var apiKEY="a0aca8a89948154a4182dcecc780b513";
    // ids from html
        var searchCity = $("#search-city");
        var searchBtn = $("#search-btn");
        var list = $("#list-group")
        var currentCity = $("#current-city");
        var currentIMG = $("#current-img");
        var currentTemp = $("#temp");
        var currentWind =$("#wind-speed");
        var currentHumidity = $("#humidity");
        var currentUV = $("#uv-index");
    // js variables
        //var date = new Date();

// new search
    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        var city = $(searchCity).val().trim();
        console.log(city);

        getWeather(city);
        getForecast(city);
        store(city);
    });

    function store(city) {
        console.log(city);
    }

// old search
    function pullHistory() {

    }

    $("#search-btn").on("click", function(event) {
        event.preventDefault();

        var city = $(searchCity).val().trim();
        console.log(city);

        getWeather(city);
        getForecast(city);
    });

// gets current weather data
    function getWeather(city) {
        var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKEY;

        $.ajax({
            url:cityURL,
            method:"GET",
        }).then(function(data) {
            console.log(city);
            console.log(data);

            // date
            var datePull = data.dt
            var date = new Date(datePull * 1000).toLocaleDateString();
            currentCity.html(city + " ( " + date + " ) ");

            // image
            var imgPull = data.weather[0].icon;
            var imgURL = "https://openweathermap.org/img/wn/" + imgPull + "@2x.png";
            currentIMG.attr("src", imgURL);

            // temp
            var tempPull = data.main.temp;
            var tempF = Math.round((tempPull- 273.15) * 9/5 + 32);
            currentTemp.html(tempF + " °F");

            // wind
            var windPull = data.wind.speed;
            var windMPH = Math.round((windPull * 2.237) * 10) / 10
            currentWind.html(windMPH + " MPH");

            // humidity
            var humidPull = data.main.humidity;
            currentHumidity.html(humidPull + "%");

            // uv index
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKEY + "&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url:uvURL,
                method:"GET"
                }).then(function(data) {
                    console.log(data);
                    currentUV.html(data.value);
                });

        });
    }

// gets 5 day forecast
    function getForecast(city) {
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ apiKEY;

        $.ajax({
            url:forecastURL,
            method:"GET",
        }).then(function(data) {
            console.log(city);
            console.log(data);

            for (i = 0; i < 5; i++) {
                console.log(i);

                // date
                var date = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                $("#date" + i).html(date);

                // img
                var imgPull = data.list[((i + 1) * 8) - 1].weather[0].icon;
                var imgURL = "https://openweathermap.org/img/wn/" + imgPull + ".png";
                $("#img" + i).attr("src", imgURL);

                // temp
                var tempPull = data.list[((i + 1) * 8) - 1].main.temp;
                var tempF = Math.round((tempPull- 273.15) * 9/5 + 32);
                $("#temp" + i).html(tempF + " °F");

                // wind
                var windPull = data.list[((i + 1) * 8) - 1].wind.speed;
                var windMPH = Math.round((windPull * 2.237) * 10) / 10
                $("#wind" + i).html(windMPH + " MPH");

                // humidity
                var humidPull = data.list[((i + 1) * 8) - 1].main.humidity;
                $("#humidity" + i).html(humidPull + "%");

            }

        });
    }
// run functions
pullHistory();