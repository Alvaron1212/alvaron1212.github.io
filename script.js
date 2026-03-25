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

async function GetTemperature(){
  // Data
  const Unit = UnitInput.value;
  let Location = LocationInput.value;
  LocationDisplay.textContent = '~~~~~';
  TemperatureDisplay.textContent = '~';
  
  // Fetch
  try {
    let GeoAPI = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${Location}`);
    let GeoData = await GeoAPI.json();
    
    if (!GeoData.results){
      LocationDisplay.textContent = 'Unknown';
      return
    }
    
    const Place = GeoData.results[0];
    
    let TempAPI = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${Place.latitude}&longitude=${Place.longitude}&hourly=temperature_2m&current=temperature_2m`);
    let TempData = await TempAPI.json();
    
    const Temp = TempData.current.temperature_2m;
    const TempFinal = Math.round(Calc(Temp, Unit));
    
    // Displayer
    TemperatureDisplay.textContent = TempFinal;
    
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

UnitInput.addEventListener('change', () => {
  GetTemperature();
})
