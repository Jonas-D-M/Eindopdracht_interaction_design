// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint =
  "https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0";

fetch(serverEndpoint)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    getSolKeys(json);
  });

const getSolKeys = function(json) {
  let list = "";
  let keys = [];
  let avTemp, mnTemp, mxTemp;

  let i = 0;
  for (let days of json.sol_keys) {
    keys.push(days);

    avTemp = FahrenheitToCelsius(json[keys[i]].AT.av);
    mnTemp = FahrenheitToCelsius(json[keys[i]].AT.mn);
    mxTemp = FahrenheitToCelsius(json[keys[i]].AT.mx);

    list += `<div class="c-weather-body">
    <div class="c-weather-header">Sol ${keys[i]}</div>
    <div class="c-weather-subheader">Today</div>
    <hr />
    <div class="c-weather-high">
      <div class="c-weather-text">High:</div>
      <div class="c-weather-value">${mxTemp} °C</div>
    </div>
    <div class="c-weather-low">
      <div class="c-weather-text">Low:</div>
      <div class="c-weather-value">${mnTemp} °C</div>
    </div>
  </div>`;

    i++;
  }

  document.querySelector(".c-weather").innerHTML = list;
};

const FahrenheitToCelsius = function(fahrenheit) {
  let fTemp = fahrenheit;
  let conversion = ((fTemp - 32) * 5) / 9;
  return Number(conversion.toFixed(2));
};

document.addEventListener("DOMContentLoaded", function() {
  console.log("JAVASCRIPT IS LOADED!");
});
