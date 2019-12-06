// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint = 'https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0';

fetch(serverEndpoint)
  .then(function(response) {
    console.log(response.json);
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    getWeatherData(json);
  });

const getWeatherData = function(json) {
  let list = '';
  let keys = [];
  let avTemps = [];
  let mnTemps = [];
  let mxTemps = [];
  let i = 0;
  let windDirections = { 1: 'N', 2: 'NNE', 3: 'NE', 4: 'ENE', 5: 'E', 6: 'ESE', 7: 'SE', 8: 'SSE', 9: 'S', 10: 'SSE', 11: 'SW', 12: 'WSW', 13: 'W', 14: 'WNW', 15: 'NW', 16: 'NNW' };

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
    if (i == 0) {
      list += `
      <div class="header">
      <div class="c-weather-body">
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
        <svg class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
          <title>Windroos</title>
          <g transform="translate(-113 -365.479)">
            <g transform="translate(157 379.174)">
              <path d="M8.3,0l8.3,34.8H0Z" transform="translate(0 0)" fill="#fff" />
              <path d="M8.3,0l8.3,34.8H0Z" transform="translate(16.607 69.592) rotate(-180)" fill="#e3dddd" />
            </g>
            <text transform="translate(165 463.479)" fill="#fff" font-size="16" font-family="Montserrat-Regular, Montserrat"><tspan x="-6.504" y="0">N</tspan></text>
          </g>
          <g fill="none" stroke="#fff" stroke-width="1">
            <circle cx="52.5" cy="52.5" r="52.5" stroke="none" />
            <circle cx="52.5" cy="52.5" r="52" fill="none" />
          </g>
        </svg>
      </div>
    </div>
    `;
    } else {
      list += `
      <div class="main">
      <div class="c-weather-body">
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
        <svg class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
          <title>Windroos</title>
          <g transform="translate(-113 -365.479)">
            <g transform="translate(157 379.174)">
              <path d="M8.3,0l8.3,34.8H0Z" transform="translate(0 0)" fill="#fff" />
              <path d="M8.3,0l8.3,34.8H0Z" transform="translate(16.607 69.592) rotate(-180)" fill="#e3dddd" />
            </g>
            <text transform="translate(165 463.479)" fill="#fff" font-size="16" font-family="Montserrat-Regular, Montserrat"><tspan x="-6.504" y="0">N</tspan></text>
          </g>
          <g fill="none" stroke="#fff" stroke-width="1">
            <circle cx="52.5" cy="52.5" r="52.5" stroke="none" />
            <circle cx="52.5" cy="52.5" r="52" fill="none" />
          </g>
        </svg>
      </div>
      
    </div>
    `;
    }
  }
  document.querySelector('.c-weather').innerHTML = list;
  console.log('Script success!');
};

const FahrenheitToCelsius = function(fahrenheit) {
  let fTemp = fahrenheit;
  let conversion = ((fTemp - 32) * 5) / 9;
  return Number(conversion.toFixed(2));
};

window.addEventListener('load', event => {
  document.getElementById('c-loader').style.display = 'None';
  console.log('Page is fully loaded in');
});

document.addEventListener('DOMContentLoaded', function() {
  console.log('JAVASCRIPT IS LOADED!');
});
