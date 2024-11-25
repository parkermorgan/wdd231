const apiKey = 'deb344ac11393a9cb1c04cb7910804bb';
const city = 'Rexburg,us';  
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

function getWeather() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
        
            weatherInfo.innerHTML = `
                <div class="weather-info">
                    <h3>Temperature: ${temperature}°F</h3>
                    <p>${weatherDescription}</p>
                    <img src="${iconUrl}" alt="${weatherDescription}">
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>Unable to load weather data.</p>`;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'deb344ac11393a9cb1c04cb7910804bb';  
    const city = 'Rexburg,us';  
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('forecast-container').innerHTML = 'Unable to load weather data.';
        });

    function displayForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        const forecastDays = getThreeDayForecast(data);

        forecastContainer.innerHTML = '';

        forecastDays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('forecast-day');
            dayElement.innerHTML = `
                <h3>${day.date}</h3>
                <p><strong>Temp:</strong> ${day.temp}°F</p>
                <p><strong>Weather:</strong> ${day.weather}</p>
                <p><strong>Wind:</strong> ${day.wind} mph</p>
            `;
            forecastContainer.appendChild(dayElement);
        });
    }

    function getThreeDayForecast(data) {
        const forecast = [];
        let currentDay = '';
        let dayCounter = 0;

        data.list.forEach(item => {
            const forecastDate = new Date(item.dt * 1000);
            const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });

            if (dayCounter < 3) {
                if (currentDay !== dayName) {
                    currentDay = dayName;

                    const temp = item.main.temp;
                    const weather = item.weather[0].description;
                    const wind = item.wind.speed;

                    forecast.push({
                        date: dayName,
                        temp: temp.toFixed(1),
                        weather: weather,
                        wind: wind.toFixed(1)
                    });

                    dayCounter++;
                }
            }
        });

        return forecast;
    }

    getWeather()
});
