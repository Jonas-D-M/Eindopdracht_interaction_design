// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint =
  "https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0";

fetch(serverEndpoint)
  .then(function(response) {
    console.log(response.json);
    return response.json();
  })
  .then(function(json) {
    getSolKeys(json);
  });

const getSolKeys = function(json) {
  let list = "";
  let keys = [];
  let avTemps = [];
  let mnTemps = [];
  let mxTemps = [];
  let i = 0;
  for (let days of json.sol_keys) {
    let avTemp, mnTemp, mxTemp;

    keys.push(days);

    avTemp = FahrenheitToCelsius(json[keys[i]].AT.av);
    mnTemp = FahrenheitToCelsius(json[keys[i]].AT.mn);
    mxTemp = FahrenheitToCelsius(json[keys[i]].AT.mx);

    avTemps.push(avTemp);
    mnTemps.push(mnTemp);
    mxTemps.push(mxTemp);

    i++;
  }
  keys.reverse();
  avTemps.reverse();
  mnTemps.reverse();
  mxTemps.reverse();

  for (let i = 0; i < keys.length; i++) {
    list += `<div class="c-weather-body">
    <div class="c-weather-header">Sol ${keys[i]}</div>
    <hr />
    <div class="c-weather-high">
      <div class="c-weather-text">High:</div>
      <div class="c-weather-value">${mxTemps[i]} °C</div>
    </div>
    <div class="c-weather-low">
      <div class="c-weather-text">Low:</div>
      <div class="c-weather-value">${mnTemps[i]} °C</div>
    </div>
    <div class="c-weather-average">
                <div class="c-weather-text">Ave:</div>
                <div class="c-weather-value">${avTemps[i]} °C</div>
              </div>
  </div>
  `;
  }

  document.querySelector(".c-weather").innerHTML = list;
};

const FahrenheitToCelsius = function(fahrenheit) {
  let fTemp = fahrenheit;
  let conversion = ((fTemp - 32) * 5) / 9;
  return Number(conversion.toFixed(2));
};

// const solToDate = function(sol, year) {
//   let day = sol * 1.0275;
//   let date = new Date(year, 0); // initialize a date in `year-01-01`
//   return new Date(date.setDate(day)); // add the number of days
// };

document.addEventListener("DOMContentLoaded", function() {
  console.log("JAVASCRIPT IS LOADED!");
});
