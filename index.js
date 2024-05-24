const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const toggleUnitBtn = document.getElementById("toggleUnitBtn");
const apiKey = "bee6c8a210fda8affd1b4fceb5403029";
let isCelsius = true; // Default unit is Celsius

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value.toLowerCase();
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

toggleUnitBtn.addEventListener("click", () => {
    isCelsius = !isCelsius; // Toggle between Celsius and Fahrenheit
    updateTemperatureUnit(); // Update displayed temperature unit
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("h1");
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${convertTemperature(temp)}°`; // Display temperature with the correct unit
    humidityDisplay.textContent = `Humidity: ${humidity}%`; 
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function convertTemperature(temp) {
    return isCelsius ? (temp - 273.15).toFixed(1) + "°C" : ((temp - 273.15) * 1.8 + 32).toFixed(1) + "°F";
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "☔";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🛸";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

function updateTemperatureUnit() {
    const tempDisplay = document.querySelector(".tempDisplay");
    const tempValue = tempDisplay.textContent.split(" ")[0]; // Extract the temperature value
    tempDisplay.textContent = `${isCelsius ? tempValue.replace("F", "C") : tempValue.replace("C", "F")}`;
}
