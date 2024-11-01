const button = document.querySelector('#nextJoke') as HTMLButtonElement | null;
const jokeContainer = document.getElementById('joke') as HTMLElement | null;


async function fetchJoke(): Promise<void> {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            console.error('Error en obtenir l\'acudit:', response.statusText);
            return;
        }

        const jokeData = await response.json();
        if (jokeContainer) {
            jokeContainer.textContent = jokeData.joke;
            console.log('Acudit rebut i mostrat:', jokeData.joke);
        }
    } catch (error) {
        console.error("Error de red al obtenir l'acudit:", error);
    }
}


let reportAcudits: { joke: string; score: number; date: string }[] = [];
console.log("Inicialització de reportAcudits:", reportAcudits);

function votaAcudit(joke: string) {
    console.log("Funció votaAcudit crida amb l'acudit:", joke);

    const selectedEmoji = document.querySelector('input[name="inlineRadioOptions"]:checked') as HTMLInputElement;
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
    if (jokeContainer?.innerText) {
        console.log("Funció newJoke. Acudit actual:", jokeContainer.innerText);
        votaAcudit(jokeContainer.innerText);
    }
}

function setupButtonListener(): void {
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





