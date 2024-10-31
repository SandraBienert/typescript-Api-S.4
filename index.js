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
const button = document.querySelector('#nextJoke');
const jokeContainer = document.getElementById('joke');
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                console.error('Error en obtenir l\'acudit:', response.statusText);
                return;
            }
            const jokeData = yield response.json();
            if (jokeContainer) {
                jokeContainer.textContent = jokeData.joke;
                console.log('Acudit rebut i mostrat:', jokeData.joke);
            }
        }
        catch (error) {
            console.error("Error de red al obtenir l'acudit:", error);
        }
    });
}
let reportAcudits = [];
console.log("Inicialització de reportAcudits:", reportAcudits);
function votaAcudit(joke) {
    console.log("Funció votaAcudit crida amb l'acudit:", joke);
    const selectedEmoji = document.querySelector('input[name="inlineRadioOptions"]:checked');
    const score = selectedEmoji ? parseInt(selectedEmoji.value) : 0;
    const acudit = {
        joke: joke,
        score: score,
        date: new Date().toISOString()
    };
    reportAcudits.push(acudit);
    console.log("Array reportAcudits actualizada:", reportAcudits);
}
function newJoke() {
    if (jokeContainer === null || jokeContainer === void 0 ? void 0 : jokeContainer.innerText) {
        console.log("Funció newJoke. Acudit actual:", jokeContainer.innerText);
        votaAcudit(jokeContainer.innerText);
    }
}
function setupButtonListener() {
    if (button) {
        button.removeEventListener('click', handleClick);
        button.addEventListener('click', handleClick);
    }
}
function handleClick() {
    newJoke();
    fetchJoke();
}
document.addEventListener('DOMContentLoaded', () => {
    fetchJoke();
    setupButtonListener();
});
