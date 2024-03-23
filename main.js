const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temperature');
const dateOutput = document.querySelector('.city-date');
const timeOutput = document.querySelector('.city-time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.city-name');
const icon = document.querySelector('#icon');
const couldOutput = document.querySelector('.cloud');
const humadityOutput = document.querySelector('.humadity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



//Default City When The Page Loads
let cityInput = "Casablanca";
const apiKey = 'eb4eb9af9803774f054aac1f4e699749';
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`

//Add Click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    console.log(cityInput)
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`
    fetchWeatherData(apiURL);
  })
})

//Add submit event to the form
form.addEventListener('submit', (e) => {
  if(search.value.length == 0){
    alert('Please type in a city name');
  }else{
    cityInput = search.value;
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`
    fetchWeatherData(apiURL);
    search.value = "";
  }

  e.preventDefault();
});

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function dayOfTheWeek(date){
  const dayArray = date.getDay();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const day = weekday[dayArray];
  return day;
}


// getting current time & date and displaying it
let newCurrentTime = new Date();
timeOutput.innerHTML = formatTime(newCurrentTime);

let newCurrentDay = new Date();
dateOutput.innerHTML = dayOfTheWeek(newCurrentDay);

const fetchWeatherData = async (url) => {

  const res = await fetch(url);
  const data = await res.json()

  console.log(data)

  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  conditionOutput.innerHTML = data.weather[0].description; 
  nameOutput.innerHTML = data.name;
  couldOutput.innerHTML = `${data.clouds.all}%`;
  humadityOutput.innerHTML = `${data.main.humidity}%`;
  windOutput.innerHTML = `${data.wind.speed}Km/h`;

  // Get UTC offset of the selected city
  const utcOffset = data.timezone / 3600; // Convert seconds to hours

  // Update date and time
  const currentTime = new Date();
  const currentUtcTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
  const cityTime = new Date(currentUtcTime + (utcOffset * 3600000));

  timeOutput.innerHTML = formatTime(cityTime);

  const cityDay = new Date(currentUtcTime + (utcOffset * 3600000));
  dateOutput.innerHTML = dayOfTheWeek(cityDay);
}

fetchWeatherData(apiURL);