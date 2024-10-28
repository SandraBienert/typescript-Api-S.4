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
// Definim una funció per obtenir un acudit
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Error al obtenir l\'acudit:', response.statusText);
            return;
        }
        const jokeData = yield response.json();
        const jokeElement = document.getElementById('joke');
        if (jokeElement) {
            jokeElement.textContent = jokeData.joke;
            console.log('Acudit:', jokeData.joke);
        }
    });
}
// Funció per gestionar el clic del botó
function setupButtonListener() {
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
