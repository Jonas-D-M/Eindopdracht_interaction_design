// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint = 'https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0';

const fetchData = function() {
  fetch(serverEndpoint)
    .then(function(response) {
      console.log(response.json);
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      getWeatherData(json);
    });
};
let firstPage = '';
let secondPage = '';
const getWeatherData = function(json) {
  let windList = [];

  let keys = [];
  let avTemps = [];
  let mnTemps = [];
  let mxTemps = [];
  let dates = [];
  let dt, day, month;
  let i = 0;

  const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const windDirections = { 1: 'N', 2: 'NNE', 3: 'NE', 4: 'ENE', 5: 'E', 6: 'ESE', 7: 'SE', 8: 'SSE', 9: 'S', 10: 'SSE', 11: 'SW', 12: 'WSW', 13: 'W', 14: 'WNW', 15: 'NW', 16: 'NNW' };

  for (let days of json.sol_keys) {
    let avTemp, mnTemp, mxTemp;
    keys.push(days);
    dt = new Date(json[keys[i]].Last_UTC);

    wind = json[keys[i]].WD.most_common.compass_degrees;
    avTemp = FahrenheitToCelsius(json[keys[i]].AT.av);
    mnTemp = FahrenheitToCelsius(json[keys[i]].AT.mn);
    mxTemp = FahrenheitToCelsius(json[keys[i]].AT.mx);
    day = dt.getDate().toString();
    month = monthNames[dt.getMonth()];

    windList.push(wind);
    dates.push(month + ' ' + day);
    avTemps.push(avTemp);
    mnTemps.push(mnTemp);
    mxTemps.push(mxTemp);
    i++;
  }
  console.log(windList);

  // insert on page
  for (let i = 0; i < keys.length - 1; i++) {
    if (i == 0) {
      secondPage += `
      <div class="main second">
      <div class="c-weather-body">
        <div class="c-weather-header">Sol ${keys[i]}</div>
        <div class"c-weather-subheader>${dates[i]}</div>
        <hr />
        <div class="c-weather-high">
          <div class="c-weather-text">Hi:</div>
          <div class="c-weather-value">${mxTemps[i]} °C</div>
        </div>
        <div class="c-weather-low">
          <div class="c-weather-text">Lo:</div>
          <div class="c-weather-value">${mnTemps[i]} °C</div>
        </div>
        <div class="c-weather-average">
          <div class="c-weather-text">Av:</div>
          <div class="c-weather-value">${avTemps[i]} °C</div>
        </div>
        <svg id=${i} class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
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
    } else if (i < 3) {
      secondPage += `
      <div class="main second">
      <div class="c-weather-body">
        <div class="c-weather-header">Sol ${keys[i]}</div>
        <div class"c-weather-subheader>${dates[i]}</div>
        <hr />
        <div class="c-weather-high">
          <div class="c-weather-text">Hi:</div>
          <div class="c-weather-value">${mxTemps[i]} °C</div>
        </div>
        <div class="c-weather-low">
          <div class="c-weather-text">Lo:</div>
          <div class="c-weather-value">${mnTemps[i]} °C</div>
        </div>
        <div class="c-weather-average">
          <div class="c-weather-text">Av:</div>
          <div class="c-weather-value">${avTemps[i]} °C</div>
        </div>
        <svg id=${i} class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
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
      firstPage += `
      <div class="main">
      <div class="c-weather-body">
        <div class="c-weather-header">Sol ${keys[i]}</div>
        <div class"c-weather-subheader>${dates[i]}</div>
        <hr />
        <div class="c-weather-high">
          <div class="c-weather-text">Hi:</div>
          <div class="c-weather-value">${mxTemps[i]} °C</div>
        </div>
        <div class="c-weather-low">
          <div class="c-weather-text">Lo:</div>
          <div class="c-weather-value">${mnTemps[i]} °C</div>
        </div>
        <div class="c-weather-average">
          <div class="c-weather-text">Av:</div>
          <div class="c-weather-value">${avTemps[i]} °C</div>
        </div>
        <svg id=${i} class="c-compass" xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105">
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
  document.querySelector('.c-weather').innerHTML = firstPage;
  console.info('Data loaded');
};

const FahrenheitToCelsius = function(fahrenheit) {
  let fTemp = fahrenheit;
  let conversion = ((fTemp - 32) * 5) / 9;
  return Number(conversion.toFixed(2));
};

window.addEventListener('load', event => {
  console.info('Page fuly loaded');
  let btnPrev = document.getElementById('previous');
  let btnNext = document.getElementById('next');

  btnNext.addEventListener('click', function() {
    document.querySelector('.c-weather').innerHTML = firstPage;
    document.getElementById('elipse1').style.opacity = 0.5;
    document.getElementById('elipse2').style.opacity = 1;
    document.getElementById('previous').style.opacity = 1;
    document.getElementById('next').style.opacity = 0;
  });
  btnPrev.addEventListener('click', function() {
    document.querySelector('.c-weather').innerHTML = secondPage;
    document.getElementById('elipse1').style.opacity = 1;
    document.getElementById('elipse2').style.opacity = 0.5;
    document.getElementById('previous').style.opacity = 0;
    document.getElementById('next').style.opacity = 1;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  console.info('JS loaded');
  fetchData();
});
