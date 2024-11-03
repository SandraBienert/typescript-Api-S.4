//API METEO
var weatherOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'f6819e7937msh41c28ae60cc5864p15d91bjsn4b7a2b1b75d4',
        'x-rapidapi-host': 'weather-api99.p.rapidapi.com'
    }
};
fetch('https://weather-api99.p.rapidapi.com/weather?city=barcelona', weatherOptions)
    .then(function (response) {
    if (!response.ok) {
        throw new Error('Error en la sol·licitud');
    }
    return response.json();
})
    .then(function (data) {
    var temperature = data.main.temp;
    var weatherDescription = data.weather[0].description;
    var weatherIcon = data.weather[0].icon; // suposant que l'API retorna una icona
    mostrarInformacioMeteorologica(temperature, weatherDescription, weatherIcon);
})
    .catch(function (error) {
    console.error('Error:', error);
});
function mostrarInformacioMeteorologica(temperature, weatherDescription, weatherIcon) {
    var meteorologiaDiv = document.getElementById('meteorologia');
    if (meteorologiaDiv) {
        meteorologiaDiv.innerHTML = "Temperatura: ".concat(temperature, "\u00B0C, Descripci\u00F3: ").concat(weatherDescription, " <br> <img src=\"http://openweathermap.org/img/w/").concat(weatherIcon, ".png\" alt=\"Icona meteo\">");
    }
    else {
        console.error('L\'element meteorologia no s\'ha trobat.');
    }
}
function obtenirIconaMeteorologica(description) {
    switch (description.toLowerCase()) {
        case 'clear sky':
        case 'sunny':
            return './css/icons/path_to_sunny_icon.png';
        case 'few clouds':
        case 'partly cloudy':
            return './css/icons/path_to_partly_cloudy_icon.png';
        case 'broken clouds':
        case 'cloudy':
            return './css/icons/path_to_cloudy_icon.png';
        case 'rain':
        case 'shower rain':
            return './css/icons/path_to_rain_icon.png';
        case 'thunderstorm':
            return './css/icons/path_to_thunderstorm_icon.png';
        case 'snow':
            return './css/icons/path_to_snow_icon.png';
        case 'mist':
        case 'fog':
            return './css/icons/path_to_fog_icon.png';
        default:
            return 'Hi ha hagut algun error';
    }
}
