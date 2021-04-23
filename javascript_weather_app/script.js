var lat;
var lon;
let pollution = {
    apiKey: "2db7e2cfc3915604acc6f6c823ea8bcf",
    fetchPollution: function() {
        // var start = 1606488670;
        // var end = 1606747870;
        var lat = 18.5196;
        var lon = 73.8553
        fetch(
                // "http://api.openweathermap.org/data/2.5/air_pollution/history?lat=18.5196&lon=73.8553&start=1606223802&end=1606482999&appid=2db7e2cfc3915604acc6f6c823ea8bcf"
                "http://api.openweathermap.org/data/2.5/air_pollution/history?lat=" + lat +
                "&lon=" + lon + "&start=1606488670" + "&end=1606747870",
                "&appid=" +
                this.apiKey
            )
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    // alert("No Pullution data found.");
                    throw new Error("No Pullution data found.");
                }
                return response.json();
            })
            .then((data) => this.displayPollution(data))
            // .catch(error => {
            //     throw (error);
            // })
    },
    displayPollution: function(data) {
        console.log("YES:::", data);
        // const { name } = data;
        // document.querySelector(".city").innerText = "Weather in " + name;

    },
};
let weather = {
    apiKey: "2db7e2cfc3915604acc6f6c823ea8bcf",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        lat = data.coord.lat;
        lon = data.coord.lon;
        console.log("lat", lat, lon);
        // this.pollution.fetchPollution();
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });


weather.fetchWeather("Pune");
// pollution.fetchPollution();