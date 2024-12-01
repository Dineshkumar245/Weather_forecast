// OpenWeatherMap API key
const apiKey = '99ac0bd9a7e34a6584a89ff6ab231996'; // Replace with your API key
// Replace with your actual API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const air = document.getElementById('air');
const condition = document.getElementById('condition');

// Fetch weather and air quality data
async function getWeatherAndAirQuality(city) {
    const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        // Fetch weather data
        const weatherResponse = await fetch(apiUrlWeather);
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();

        // Get the coordinates (latitude and longitude) for air quality API
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;

        const apiUrlAirQuality = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        // Fetch air quality data
        const airQualityResponse = await fetch(apiUrlAirQuality);
        const airQualityData = await airQualityResponse.json();

        // Update the DOM with weather data
        cityName.textContent = `Weather in ${weatherData.name}`;
        temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        condition.textContent = `Condition: ${weatherData.weather[0].description}`;

        // Process air quality data
        const aqi = airQualityData.list[0].main.aqi;
        let airQualityText = '';
        switch (aqi) {
            case 1:
                airQualityText = 'Good';
                break;
            case 2:
                airQualityText = 'Fair';
                break;
            case 3:
                airQualityText = 'Moderate';
                break;
            case 4:
                airQualityText = 'Poor';
                break;
            case 5:
                airQualityText = 'Very Poor';
                break;
            default:
                airQualityText = 'Data not available';
        }

        // Display air quality
        air.textContent = `Air Quality: ${airQualityText}`;

    } catch (error) {
        alert('Error fetching data: ' + error.message);
    }
}

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherAndAirQuality(city);
    } else {
        alert('Please enter a city name.');
    }
});