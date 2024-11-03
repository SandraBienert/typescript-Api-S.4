"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let jokes = [];
let currentJokeIndex = 0;
let reportAcudits = [];
// Funció per obtenir acudits d'ambdues APIs
function fetchJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response1 = yield fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            if (!response1.ok) {
                throw new Error("Error al carregar els acudits de l'API 1.");
            }
            const joke1 = yield response1.json();
            const response2 = yield fetch('https://v2.jokeapi.dev/joke/Any?lang=es');
            if (!response2.ok) {
                throw new Error("Error al carregar els acudits de l'API 2.");
            }
            const joke2 = yield response2.json();
            jokes = [
                joke1.joke,
                joke2.joke || `${joke2.setup} ${joke2.delivery}`
            ];
            currentJokeIndex = 0;
            displayJoke();
        }
        catch (error) {
            console.error(error);
            const jokeContainer = document.getElementById("joke");
            jokeContainer.innerText = "No s'ha pogut carregar cap acudit. Si us plau, torna a intentar-ho.";
        }
    });
}
// Funció per mostrar l'acudit actual
function displayJoke() {
    const jokeContainer = document.getElementById("joke");
    if (jokes.length > 0) {
        jokeContainer.innerText = jokes[currentJokeIndex];
    }
}
// Funció per gestionar la votació
function voteJoke(score) {
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
    const nextJokeButton = document.getElementById("nextJoke");
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
            const score = parseInt(event.target.value, 10);
            voteJoke(score);
        });
    });
    // Càrrega inicial de acudits
    fetchJokes();
});
