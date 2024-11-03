interface Joke {
    joke: string;
    score: number | null;
    date: string;
}

interface JokeResponse1 {
    joke: string;
}

interface JokeResponse2 {
    joke?: string;
    setup?: string;
    delivery?: string;
}

let jokes: string[] = [];
let currentJokeIndex = 0;
let reportAcudits: Joke[] = [];

// Funció per obtenir acudits d'ambdues APIs
async function fetchJokes() {
    try {
        const response1 = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        if (!response1.ok) {
            throw new Error("Error al carregar els acudits de l'API 1.");
        }
        const joke1 = await response1.json() as JokeResponse1;

        const response2 = await fetch('https://v2.jokeapi.dev/joke/Any?lang=es');
        if (!response2.ok) {
            throw new Error("Error al carregar els acudits de l'API 2.");
        }
        const joke2 = await response2.json() as JokeResponse2;

        jokes = [
            joke1.joke,
            joke2.joke || `${joke2.setup} ${joke2.delivery}`
        ];
        currentJokeIndex = 0;
        displayJoke();
    } catch (error) {
        console.error(error);
        const jokeContainer = document.getElementById("joke") as HTMLElement;
        jokeContainer.innerText = "No s'ha pogut carregar cap acudit. Si us plau, torna a intentar-ho.";
    }
}

// Funció per mostrar l'acudit actual
function displayJoke() {
    const jokeContainer = document.getElementById("joke") as HTMLElement;
    if (jokes.length > 0) {
        jokeContainer.innerText = jokes[currentJokeIndex];
    }
}

// Funció per gestionar la votació
function voteJoke(score: number) {
    if (jokes.length > 0) {
        const joke = jokes[currentJokeIndex];
        reportAcudits.push({
            joke: joke,
            score: score,
            date: new Date().toISOString()
        });
        console.log(reportAcudits);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const nextJokeButton = document.getElementById("nextJoke") as HTMLButtonElement;

    // Manejador del botó "Següent acudit"
    nextJokeButton.addEventListener("click", () => {
        if (jokes.length > 0) {
            currentJokeIndex = (currentJokeIndex + 1) % jokes.length;
            displayJoke();
        }
    });

    // Manejador dels botons de radio per votar
    const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const score = parseInt((event.target as HTMLInputElement).value, 10);
            voteJoke(score);
        });
    });

    // Càrrega inicial de acudits
    fetchJokes();
});
