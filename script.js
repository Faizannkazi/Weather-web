const apiKey = '4c314e1fcd4ea91fba1d81f0ef71d936'; 

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) throw new Error(data.message);

    document.getElementById('weatherInfo').innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
  } catch (err) {
    document.getElementById('weatherInfo').innerHTML = `<p style="color: #ffdddd;">Error: ${err.message}</p>`;
  }
}