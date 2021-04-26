// variables
    // open weather API key
        var APIKey="a0aca8a89948154a4182dcecc780b513";
    // the searched city
        var city="";
        var sCity=[];
    // ids from html
        var searchCity = $("#search-city");
        var searchButton = $("#search-button");
        var clearButton = $("#clear-history");
        var currentCity = $("#current-city");
        var currentTemperature = $("#temperature");
        var currentHumidity = $("#humidity");
        var currentWind =$("#wind-speed");
        var currentUV = $("#uv-index");


// searches for city
    function find(c) {
        for (var i = 0; i < sCity.length; i++){
            if(c.toUpperCase()===sCity[i]){
                return -1;
            }
        }
        return 1;
    }


// display current and 5-day forecast weather
    function displayWeather(event) {
        event.preventDefault();
        if(searchCity.val().trim()!==""){
            city=searchCity.val().trim();
            currentWeather(city);
        }
    }


// weather
    function currentWeather(city) {
        // open weather query url
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

        $.ajax({
            url:queryURL,
            method:"GET",
        }).then(function(response) {
            console.log(response);

            // weather icons
            var weatherIcon = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            var date = new Date(response.dt * 1000).toLocaleDateString();

            $(currentCity).html(response.name + "("+date+")" + "<img src=" + iconURL + ">");

            // temp
            // converts temperature to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(currentTemperature).html((tempF).toFixed(2) + " &#8457");

            // wind speed
            // converts wind speed to MPH
            var ws = response.wind.speed;
            var windsMPH = (ws * 2.237).toFixed(1);
            $(currentWind).html(windsMPH + " MPH");

            // humidity
            $(currentHumidity).html(response.main.humidity + "%");

            // uv index
            uvIndex(response.coord.lon,response.coord.lat);
            forecast(response.id);

            if(response.cod==200) {
                sCity=JSON.parse(localStorage.getItem("cityname"));
                console.log(sCity);
                if (sCity==null) {
                    sCity=[];
                    sCity.push(city.toUpperCase()
                    );
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
                else {
                    if(find(city) > 0) {
                        sCity.push(city.toUpperCase());
                        localStorage.setItem("cityname",JSON.stringify(sCity));
                        addToList(city);
                    }
                }
            }

        });
    }


// uv index
    function uvIndex(ln,lt) {
        // open weather query url - uv index
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;

        $.ajax({
                url:uvURL,
                method:"GET"
                }).then(function(response) {
                    $(currentUV).html(response.value);
                });
    }
    
// 5-day forecast
    function forecast(cityid) {
        var dayOver = false;
        // open weather query url - forecast
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid="+ APIKey;

        $.ajax({
            url:forecastURL,
            method:"GET"
        }).then(function(response) {
            
            for (i = 0; i < 5; i++) {
                var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                var iconCode = response.list[((i + 1) * 8) - 1].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
                var tempK= response.list[((i + 1) * 8) - 1].main.temp;
                var tempF=(((tempK - 273.5) * 1.80) + 32).toFixed(2);
                var ws = response.list[((i + 1) * 8) - 1].wind.speed;
                var windsMPH = (ws * 2.237).toFixed(1);
                var humidity = response.list[((i + 1) * 8) - 1].main.humidity;
            
                $("#fDate" + i).html(date);
                $("#fImg" + i).html("<img src=" + iconURL + ">");
                $("#fTemp" + i).html(tempF + " &#8457");
                $("#fWind" + i).html(windsMPH + " MPH");
                $("#fHumidity" + i).html(humidity + "%");
            }
            
        });
    }


// search column functions
    // search history
        function addToList(c) {
            var listEl = $("<li>" + c.toUpperCase() + "</li>");

            $(listEl).attr("class","list-group-item");
            $(listEl).attr("data-value",c.toUpperCase());
            $(".list-group").append(listEl);
        }

        function invokePastSearch(event) {
            var liEl=event.target;
            if (event.target.matches("li")){
                city=liEl.textContent.trim();
                currentWeather(city);
            }

        }


    // searches from search history
        function loadLastCity() {
            $("ul").empty();
            var sCity = JSON.parse(localStorage.getItem("cityname"));
            if(sCity!==null){
                sCity = JSON.parse(localStorage.getItem("cityname"));
                for(i = 0; i < sCity.length; i++){
                    addToList(sCity[i]);
                }
                city=sCity[i - 1];
                currentWeather(city);
            }

        }


    // clears search history
        function clearHistory(event) {
            event.preventDefault();
            sCity=[];
            localStorage.removeItem("cityname");
            document.location.reload();

        }


// run functions
    $("#search-button").on("click",displayWeather);
    $(document).on("click",invokePastSearch);
    $(window).on("load",loadLastCity);
    $("#clear-history").on("click",clearHistory);
