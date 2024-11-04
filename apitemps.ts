//API METEO
const weatherOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'f6819e7937msh41c28ae60cc5864p15d91bjsn4b7a2b1b75d4',
        'x-rapidapi-host': 'weather-api99.p.rapidapi.com'
    }
}

fetch('https://weather-api99.p.rapidapi.com/weather?city=barcelona', weatherOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la sol·licitud');
        }
        return response.json();
    })
    .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon; // suposant que l'API retorna una icona
        mostrarInformacioMeteorologica(temperature, weatherDescription, weatherIcon);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function mostrarInformacioMeteorologica(temperature: number, weatherDescription: string, weatherIcon: string) {
    const meteorologiaDiv = document.getElementById('meteorologia');
    if (meteorologiaDiv) {
        meteorologiaDiv.innerHTML = `Temperatura:<br>${temperature}°C,<br>Descripció:<br>${weatherDescription} <br> <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Icona meteo">`;
    } else {
        console.error('L\'element meteorologia no s\'ha trobat.');
    }
}
