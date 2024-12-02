// script.js

let attempts = 7;
let targetDino = null;

// Obtener dinosaurio objetivo al iniciar el juego
fetch('api.php?action=random')
    .then(response => response.json())
    .then(data => {
        targetDino = data;
        console.log(`Dinosaurio objetivo: ${targetDino.name}`); // Para depuración
    });

function checkGuess() {
    const guess = document.getElementById("guess").value.trim();
    const hints = document.getElementById("hints");
    const remaining = document.getElementById("remaining-attempts");

    if (!guess) return;

    fetch(`api.php?action=guess&name=${guess}`)
        .then(response => response.json())
        .then(dino => {
            if (!dino) {
                hints.innerHTML += `<p>${guess} no está en la base de datos.</p>`;
                return;
            }

            if (dino.name === targetDino.name) {
                hints.innerHTML = `<p>¡Correcto! Era ${targetDino.name}.</p>`;
                return;
            }

            // Comparar características
            let feedback = `<p>${guess}: `;
            feedback += dino.height === targetDino.height ? "Altura correcta. " : dino.height > targetDino.height ? "Más bajo. " : "Más alto. ";
            feedback += dino.period === targetDino.period ? "Período correcto. " : "Período incorrecto. ";
            feedback += dino.diet === targetDino.diet ? "Dieta correcta. " : "Dieta incorrecta.";
            feedback += `</p>`;

            hints.innerHTML += feedback;

            attempts--;
            remaining.textContent = `Intentos restantes: ${attempts}`;

            if (attempts === 0) {
                hints.innerHTML += `<p>¡Te quedaste sin intentos! El dinosaurio era ${targetDino.name}.</p>`;
            }
        });
}
