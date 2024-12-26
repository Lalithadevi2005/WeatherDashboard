document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchBtn = document.getElementById('searchbtn');
    const cityInput = document.getElementById('textbox');
    const cityName = document.getElementById('city-name');
    const weatherCondition = document.getElementById('weather-condition');
    const temperature = document.getElementById('temperature');
    const currentTime = document.getElementById('current-time');
    const sunImage = document.getElementById('image');

    const apiKey = 'd7599fb44a3f822012e7953099d6c7ad';

    // Clicking on the search icon focuses on the input field
    searchIcon.addEventListener('click', () => {
        cityInput.focus();
    });

    // Handle the search button click
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();

        if (city) {
            getWeatherData(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Fetch weather data based on the city name
    function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                const weatherData = data.weather[0];
                const temp = data.main.temp;

                cityName.textContent = city;
                weatherCondition.textContent = weatherData.description;
                temperature.textContent = `Temperature: ${temp}°C`;

                const date = new Date();
                currentTime.textContent = `Current Time: ${date.toLocaleTimeString()}`;

                // Change background color based on weather
                document.body.style.backgroundColor = weatherData.main.toLowerCase().includes('sun') ? '#FFD700' : '#A9A9A9';
                sunImage.src = weatherData.main.toLowerCase().includes('sun') ? 'sunny.png' : 'rainy.png';
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to fetch weather data.');
            });
    }

});