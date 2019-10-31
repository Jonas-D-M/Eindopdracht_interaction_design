serverEndpoint = 'https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0';

fetch(serverEndpoint)
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    console.log(JSON.stringify(json));
    showWeather(json);
  });

const showWeather = function(json) {
  let keys = [];
  console.log('Callback is succesful');
  for (let days of json['sol_keys']) {
    keys.push(days);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('JAVASCRIPT IS LOADED!');
});
