//// HTML Data ////
const TemperatureDisplay = document.getElementById('temperature-display');
const LocationInput = document.getElementById('Input');
const LocationDisplay = document.getElementById('location-display');
const UnitInput = document.getElementById('Unit');

//// Function /////
function Calc(c, unit){
  if (unit === 'F') {
    return (c * 9 / 5) + 32;
  } else if (unit === 'R') {
    return (c * 4) / 5;
  };
  return c;
};

function getColor(c) {
  let r = Math.min(255, c * 8);
  let b = Math.max(0, 255 - c * 8);
  let g = 100;
  
  return `rgb(${r}, ${g}, ${b})`;
}

async function GetTemperature(){
  // Data
  const Unit = UnitInput.value;
  let Location = LocationInput.value;
  LocationDisplay.textContent = 'Getting Location And Temperature...';
  TemperatureDisplay.textContent = '~~';
  
  // Fetch
  try {
    let GeoAPI = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${Location}`);
    let GeoData = await GeoAPI.json();
    
    if (!GeoData.results && Location){
      LocationDisplay.textContent = 'No Data!';
      return
    };
    
    if (!Location){
      LocationDisplay.textContent = 'Please Enter Location Firsi!';
      return
    };
    
    const Place = GeoData.results[0];
    
    let TempAPI = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Place.latitude}&longitude=${Place.longitude}&hourly=temperature_2m&current=temperature_2m`);
    let TempData = await TempAPI.json();
    
    const Temp = TempData.current.temperature_2m;
    const TempFinal = Math.round(Calc(Temp, Unit));
    
    // Displayer
    TemperatureDisplay.textContent = TempFinal;
    TemperatureDisplay.style.color = getColor(Temp)
    
    const PlaceList = [
      Place.country,
      Place.admin1,
      Place.admin2
    ].filter(Boolean);
    
    LocationDisplay.textContent = PlaceList.join(', ');
  } catch(err){
    console.log(`Error: ${err}`)
    LocationDisplay.textContent = 'Error!'
  }
}
//// Event HTML ////
UnitInput.addEventListener('change', () => {
  GetTemperature();
});

LocationInput.addEventListener('keydown', (k) => {
  if (k.key === 'Enter'){
    GetTemperature();
  };
});
