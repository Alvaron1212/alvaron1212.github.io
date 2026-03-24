const TemperatureDisplay = document.getElementById('temperature-display');
const LatitudeInput = document.getElementById('latitude');
const LongitudeInput = document.getElementById('longitude');
const LocationDisplay = document.getElementById('location-display');

function GetTemperature(){
  let Latitude = Number(LatitudeInput.value);
  let Longitude = Number(LongitudeInput.value);
  
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${Latitude}&longitude=${Longitude}&localityLanguage=en`)
  .then(res => res.json())
  .then(data => {
    LocationDisplay.textContent = '-----'
    
    setTimeout(() => {
      LocationDisplay.textContent = data.countryName + ', ' + data.localityInfo.administrative[1].name
    }, 500)
  });
  
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&hourly=temperature_2m&current=temperature_2m`)
  .then(res => res.json())
  .then(data => {
    TemperatureDisplay.textContent = '~';
    
    setTimeout(() => {
      TemperatureDisplay.textContent = Math.round(data.current.temperature_2m)
    }, 500);
  });
};
