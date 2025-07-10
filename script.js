async function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    return alert("Please enter a city name.");
  }

  const apiKey = "4c314e1fcd4ea91fba1d81f0ef71d936";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"4c314e1fcd4ea91fba1d81f0ef71d936"}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const apiKey = "4c314e1fcd4ea91fba1d81f0ef71d936";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"4c314e1fcd4ea91fba1d81f0ef71d936"}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Location fetch failed");
        const data = await response.json();
        showWeather(data);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

function showWeather(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById('weatherIcon').src = iconUrl;
  document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('locationName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // m/s to km/h
  document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

  document.getElementById('weatherData').classList.remove('d-none');
}
