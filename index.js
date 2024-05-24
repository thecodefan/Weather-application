//WEATHER APP

const weatherForm=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="bee6c8a210fda8affd1b4fceb5403029";

weatherForm.addEventListener("submit",async event=>{ //use async here ot use await later in this function
    //forms default refresh page, we want to prevent it

    event.preventDefault();

    const city=cityInput.value.toLowerCase();
    if(city){ //if city has value = true

        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);


        }
        catch(error){

            console.error(error);
            displayError(error);

        }


    }else{
        displayError("Please  Enter a City");
    }



});

async function getWeatherData(city){

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response=await  fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather dat");
    }
    return await response.json();


}

function displayWeatherInfo(data){ //data in json like format
console.log(data);
const{name: city,
    main:{temp,humidity},
    weather:[{description,id}]}=data; //with object desturcting we make sure data has all of these, we can use them like variables

card.textContent="";
card.style.display="flex";

const cityDisplay=document.createElement("h1");
const tempDisplay=document.createElement("p");
const humidityDisplay=document.createElement("p");
const descDisplay=document.createElement("p");
const weatherEmoji=document.createElement("h1");

cityDisplay.textContent=city;
tempDisplay.textContent=`${(temp -273.15).toFixed(1)}°C`; 
humidityDisplay.textContent=`Humidity: ${humidity}`; 
descDisplay.textContent=description;
weatherEmoji.textContent=getWeatherEmoji(id);
 //the city variables we destructured . then append
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

function getWeatherEmoji(weatherId){
//with the open weather AI, group codes have the weather , so either 200 range , thunder, 300, etc, 400,, etc, 500, etc, read the documentation

switch(true){
    case(weatherId>=200 && weatherId<300):
        return "⛈️"
    case(weatherId>=300 && weatherId<400):
        return "🌧️";
    case(weatherId>=500 && weatherId<600):
        return "☔";
    case(weatherId>=600 && weatherId<700):
        return "❄️";
    case(weatherId>=700 && weatherId<800):
        return "🌫️";
    case(weatherId===800):
        return "☀️";
    case(weatherId>=801 && weatherId<810):
        return "☁️";
    default:
        return"🛸";


}



}

function displayError(message){
const errorDisplay=document.createElement("p");
errorDisplay.textContent=message;
errorDisplay.classList.add("errorDisplay");
card.textContent="";
card.style.display="flex";
card.appendChild(errorDisplay);
}