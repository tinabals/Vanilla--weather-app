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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt);
  icon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute('alt', response.data.weather[0].description);
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
