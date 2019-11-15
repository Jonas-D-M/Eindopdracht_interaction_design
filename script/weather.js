// Documentation: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
serverEndpoint =
  "https://api.nasa.gov/insight_weather/?api_key=MvvlPiedxmmIBY45P0Dboo28sPGbopdXaZ7iqamW&feedtype=json&ver=1.0";

fetch(serverEndpoint)
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(json) {
    console.log(JSON.stringify(json));
    getSolKeys(json);
    // getTemperatures(json);
  });

const getSolKeys = function(json) {
  let keys = [];
  let av_temps = [];
  let mn_temps = [];
  let mx_temps = [];

  // Gets keys to access temps
  for (let days of json.sol_keys) {
    keys.push(days);
  }

  // Gets the different temps with the keys
  for (let i = 0; i < keys.length; i++) {
    av_temp = json[keys[i]].AT.av;
    // conversion to celcius
    c_temp = (av_temp - 32) * 0.5556;
    av_temps.push(c_temp);
  }
  for (let i = 0; i < keys.length; i++) {
    mn_temp = json[keys[i]].AT.mn;
    c_temp = (mn_temp - 32) * 0.5556;
    mn_temps.push(c_temp);
  }
  for (let i = 0; i < keys.length; i++) {
    mx_temp = json[keys[i]].AT.mx;
    c_temp = (mx_temp - 32) * 0.5556;
    mx_temps.push(c_temp);
  }

  console.log("av temps");
  console.log(av_temps);
  console.log("mn temps");
  console.log(mn_temps);
  console.log("mx temps");
  console.log(mx_temps);
};

document.addEventListener("DOMContentLoaded", function() {
  console.log("JAVASCRIPT IS LOADED!");
});
