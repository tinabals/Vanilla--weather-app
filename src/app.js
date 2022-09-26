function formatDate() {
  return 'Friday 05:00';
}
function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector('#city');
  let temperatureElement = document.querySelector('#temperature');
  let description = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement = document.querySelector('#date');
  description.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt);
}
let apiKey = 'c6afaa2c3ad098fb65625db7f7ba5be4';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
