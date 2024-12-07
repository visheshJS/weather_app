const apikey = "177d4884ae187c36979920b7a5d9511c";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelectorAll(".search button");
const weather_icon = document.querySelector(".weathericon");

async function checkWeather(city,coord=[]) {
  let response;
  if(coord.length==0){
  response = await fetch(apiurl + city + `&appid=${apikey}`);}
  else if(coord[0]!=undefined && coord[1]!=undefined){
  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${apikey}&units=metric`);}
  
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".details").style.display = "none";
    alert(`write a correct city name`);
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
      weather_icon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weather_icon.src = "images/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weather_icon.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weather_icon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weather_icon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".visible_details").style.display = "flex";
    document.querySelector(".error").style.display = "none"; 
  }
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(succes)
    } else { 
      alert(`Can't Access Location`);
    }
  }
  function succes(position){
    const lat=position.coords.latitude
    const lon=position.coords.longitude
    checkWeather(null,[lat,lon])
}

searchbtn[0].addEventListener("click", () => {
  checkWeather(city=searchbox.value);
});
searchbtn[1].addEventListener("click", () => {
  getLocation();
});
