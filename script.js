let main = document.querySelector('.main-div')
let searchInput = document.querySelector(".search-input");
let cityLocation = document.querySelector(".city-location");
let cityTime = document.querySelector(".time");
let cityDate = document.querySelector(".date");
let cityIcon = document.querySelector(".icon");
let temperature = document.querySelector(".temperature");
let windSpeed = document.querySelector(".wind-speed")
let humidity = document.querySelector(".humidity")
let feelsLike = document.querySelector(".feels-like")
let uvIndex = document.querySelector(".uv-index")
let btn = document.querySelector(".btn");

const apiKey = "7a5e154704904220a0f73815230511";
let city;


searchInput.addEventListener("keyup", (e) => {
  let input = e.target.value.trim();
  city = input;
});

btn.addEventListener("click", () => {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  )
    .then(res => {
        if(!res.ok) throw new Error('Location not found!')
        return res.json()
    })
    .catch(x => {
        ErrorMessage(x.message)
    })
    .then((x) =>
      weatherData(
        x.location.tz_id,
        x.location.localtime,
        x.current.condition.icon,
        x.current.temp_c,
        x.current.wind_kph,
        x.current.humidity,
        x.current.feelslike_c,
        x.current.uv
      )
    );
});


function ErrorMessage(errorMsg){
  main.style.backgroundImage = "";
  main.style.backgroundColor = 'white';
  btn.style.backgroundColor = 'white'
  main.style.color = "black";
  btn.style.color = 'black'
  cityLocation.innerHTML = errorMsg;
  cityTime.innerHTML = '';
  cityDate.innerHTML = '';
  cityIcon.src = '';
  temperature.innerHTML = '';
  windSpeed.innerHTML ='';
  humidity.innerHTML ='';
  feelsLike.innerHTML ='';
  uvIndex.innerHTML = '';
}

function weatherData(location, time, icon, temp, speed, humidit, feels, uv) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
  cityLocation.innerHTML = location;
  cityTime.innerHTML = time;
  cityDate.innerHTML = today.toDateString();
  cityIcon.src = icon;
  temperature.innerHTML = temp + '°C';
  windSpeed.innerHTML =`<i class="fa-solid fa-wind fa-lg"></i>  ` + speed + 'km/h';
  humidity.innerHTML =`<i class="fa-solid fa-water fa-lg"></i>  ` + humidit + '%';
  feelsLike.innerHTML ='Feels like: <br>' + feels + '°C';
  uvIndex.innerHTML = uv;

    let str = `${icon}`;
    if(str.includes("night")){
      main.style.backgroundImage = "url('/app/images/night_gif.gif')";
      main.style.backgroundRepeat = "no-repeat";
      main.style.backgroundSize = "cover";
      main.style.color = "white";
      btn.style.backgroundColor = '#333d75'
      btn.style.color = 'white'
    }
    else if(str.includes("day")){
      main.style.backgroundImage = "url('/app/images/sunny-back.jpg')";
      main.style.backgroundRepeat = "no-repeat";
      main.style.backgroundSize = "cover";
      btn.style.backgroundColor = '#fbcd91'
    }
  
}

