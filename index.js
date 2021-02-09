const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon-")

const updateUI = (data) => {
    // const cityDets = data.cityDets
    // const weather = data.weather;
    // Destructure properties
    const { cityDets, weather } = data;             // easiest way to get properties off an object and store them in a const 

    // updates the  details template
    details.innerHTML =`
        <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;
    // remove the display none if present 
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    }
}

const updateCity = async (city) => {


    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key)

    return {
        cityDets: cityDets,                     // object shorthand notation  you can delete one of the names on the side and will still return cityDets and weather
        weather:weather
    }
}

cityForm.addEventListener("submit" , e => {
    // prevent default acction
    e.preventDefault(); 

    // get city value
   const city = cityForm.city.value.trim();
   cityForm.reset();


   //update the ui with new city
   updateCity(city)
   .then(data => updateUI(data))
   .catch(err => console.log(err))
})