if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }

const api = {
    key: "c14a4f7509aa9d8834a11afacb5e214b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults (searchbox.value);
        console.log (searchbox.value);
    }
}

function getResults(query){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    fetch(`${proxy}${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weatherInfo => {
            return weatherInfo.json();
        })
        .then(displayResults);
}

function displayResults (weatherInfo) {
    console.log(weatherInfo);
    
    let city = document.querySelector('.city');
    city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

    let unixTimestamp = weatherInfo.dt;
    let milliseconds = unixTimestamp*1000;
    let dateObject = new Date(milliseconds);
    let humanDateFormat = dateObject.toLocaleString(); 
    let date = document.querySelector('.date');
    date.innerText = `${humanDateFormat}`;

    let temp = document.querySelector('.temp-value');
    temp.innerText = `${weatherInfo.main.temp}`;

    let weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.innerHTML = ` <img src='http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png'> `

    let weatherMain = document.querySelector('.weather-main-description');
    weatherMain.innerText = `${weatherInfo.weather[0].main}: ${weatherInfo.weather[0].description}`;

}
