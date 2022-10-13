function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = date.getDay();
  return `${days[day]}  ${hour}:${minutes}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temp.min
      )}° </span>
      </div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '8c48afa47a9a9c24f3500c7039d50aaa';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector('#city');
  let temperatureElement = document.querySelector('#temperature');
  let description = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement = document.querySelector('#date');
  let icon = document.querySelector('#weather-icon');
  description.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt);
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute('alt', response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = 'c6afaa2c3ad098fb65625db7f7ba5be4';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function hndleSubmit(event) {
  event.preventDefault();
  let searchValue = document.querySelector('#city-input');
  search(searchValue.value);
}

let form = document.querySelector('#search-form');

form.addEventListener('submit', hndleSubmit);

function convertTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector('#temperature');
  celsius.classList.remove('active');
  fahrenheit.classList.add('active');
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function getCelsiusTemp(event) {
  event.preventDefault();
  celsius.classList.add('active');
  fahrenheit.classList.remove('active');
  let temperature = document.querySelector('#temperature');
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheit = document.querySelector('#fahrenheit-link');
fahrenheit.addEventListener('click', convertTemp);
let celsius = document.querySelector('#celsius-link');
celsius.addEventListener('click', getCelsiusTemp);

search('New York');

// displayForecast();
