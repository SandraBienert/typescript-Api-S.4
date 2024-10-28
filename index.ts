

// Definim una funció per obtenir un acudit
async function fetchJoke(): Promise<void> {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Error al obtenir l\'acudit:', response.statusText);
        return;
    }

    const jokeData = await response.json();
    const jokeElement = document.getElementById('joke');

    if (jokeElement) {
        jokeElement.textContent = jokeData.joke;
        console.log('Acudit:', jokeData.joke);
    }
}

// Funció per gestionar el clic del botó
function setupButtonListener(): void {
    const button = document.getElementById('nextJoke');
    if (button) {
        button.addEventListener('click', fetchJoke);
    }
}

// Inicialitzem l'aplicació carregant el primer acudit
window.onload = () => {
    fetchJoke();
    setupButtonListener();
};
    
