function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = response.data.main.temp;
}
let apiKey = 'c6afaa2c3ad098fb65625db7f7ba5be4';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
