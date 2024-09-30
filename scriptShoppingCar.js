const header = document.querySelector("#header");
const body = document.querySelector("body");
window.addEventListener("scroll", function() {
    header.classList.toggle("scroll", window.scrollY > 10);
});

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalPrecio = document.createElement('div'); // Div para mostrar el total
totalPrecio.classList.add('total-carrito'); // Añadir clase al div
carrito.appendChild(totalPrecio); // Agregar total al carrito
let articulosCarrito = []; // Arreglo para almacenar los elementos del carrito

// Cargar el carrito desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);
cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        const infoElemento = leerDatosElemento(elemento);
        agregarAlCarrito(infoElemento);
    }

}

function leerDatosElemento(elemento) {
    return {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('$', '').replace('.', '').replace('.', '')), // Convertir precio a número
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: 1 // Se añade una propiedad cantidad para gestionar las cantidades
    };
}

function agregarAlCarrito(elemento) {
    // Comprobar si el elemento ya existe en el carrito
    const existe = articulosCarrito.some(articulo => articulo.id === elemento.id);
    if (existe) {
        // Actualizar la cantidad del elemento existente
        articulosCarrito = articulosCarrito.map(articulo => {
            if (articulo.id === elemento.id) {
                articulo.cantidad++;
                return articulo;
            }
            return articulo;
        });
    } else {
        // Añadir el nuevo elemento al carrito
        articulosCarrito.push(elemento);
    }

    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
}

function actualizarCarrito() {
    // Limpiar el HTML previo
    limpiarCarrito();

    // Recorrer el carrito y generar el HTML
    articulosCarrito.forEach(elemento => {
        const { imagen, titulo, precio, id, cantidad } = elemento;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" class="img-carrito"></td>
            <td class="titulo-carrito">${titulo}</td>
            <td class="precio-carrito">$${precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td> <!-- Formato con miles -->
            <td class="cantidad-carrito">
                <button class="disminuir" data-id="${id}">-</button>
                ${cantidad}
                <button class="aumentar" data-id="${id}">+</button>
            </td>
            <td><a href="#" class="borrar" data-id="${id}">X</a></td>
        `;
        lista.appendChild(row);
    });

    // Actualizar el total
    actualizarTotal();

    // Agregar eventos a los botones de disminuir y aumentar
    document.querySelectorAll('.disminuir').forEach(btn => {
        btn.addEventListener('click', disminuirCantidad);
    });
    
    document.querySelectorAll('.aumentar').forEach(btn => {
        btn.addEventListener('click', aumentarCantidad);
    });
}


function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const id = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== id);
        actualizarCarrito(); // Actualizar el carrito después de eliminar el elemento
        guardarCarritoEnLocalStorage(); // Actualizar localStorage
    }
}

function vaciarCarrito() {
    articulosCarrito = []; // Reseteamos el carrito
    limpiarCarrito();
    actualizarTotal(); // Reiniciamos el total
    guardarCarritoEnLocalStorage(); // Limpiar localStorage
}

function limpiarCarrito() {
    // Mientras haya elementos en el carrito, los vamos eliminando
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function actualizarTotal() {
    let total = articulosCarrito.reduce((acc, articulo) => acc + (articulo.precio * articulo.cantidad), 0);
    totalPrecio.textContent = `Total: $${total.toLocaleString('es-CO', {minimumFractionDigits: 2})}`; // Formatear total
    if (!articulosCarrito.length) {
        totalPrecio.textContent = 'Total: $0.00';
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito)); // Guardar el carrito en localStorage
}

function cargarCarritoDesdeLocalStorage() {
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    articulosCarrito = carritoLocalStorage; // Cargar los artículos desde localStorage
    actualizarCarrito(); // Actualizar la interfaz del carrito
}
function disminuirCantidad(e) {
    const id = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.map(articulo => {
        if (articulo.id === id) {
            // Si la cantidad es mayor a 1, disminuimos
            if (articulo.cantidad > 1) {
                articulo.cantidad--;
            }
            return articulo;
        }
        return articulo;
    });

    actualizarCarrito(); // Actualizar el carrito después de disminuir la cantidad
    guardarCarritoEnLocalStorage(); // Actualizar localStorage
}
function aumentarCantidad(e) {
    const id = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.map(articulo => {
        if (articulo.id === id) {
            articulo.cantidad++;
            return articulo;
        }
        return articulo;
    });

    actualizarCarrito(); // Actualizar el carrito después de aumentar la cantidad
    guardarCarritoEnLocalStorage(); // Actualizar localStorage
}

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