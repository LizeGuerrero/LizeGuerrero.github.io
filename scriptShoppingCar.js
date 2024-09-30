const header = document.querySelector("#header");
const contenedor = document.querySelector("#contenedor");
const body = document.querySelector("body");
window.addEventListener("scroll", function() {
    if(contenedor.getBoundingClientRect().top <10) {
        header.classList.add("scroll")
    } 
    else {
        header.classList.remove("scroll")
    }
})

// Obtener las referencias al botón y al audio
const button = document.getElementById('floatbutton1');
const song = document.getElementById('song');

// Función para alternar entre reproducir y pausar
function PlayOPause() {
    if (song.paused) {
        song.play();
        button.textContent = 'Pause Music';
    } else {
        song.pause();
        button.textContent = 'Play Music';
    }
}

// Asignar el evento de clic al botón de música
button.addEventListener('click', PlayOPause);

