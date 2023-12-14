// nasaSection.mjs
// nasaSection.mjs
export function loadNasaSection(container) {
    console.log('Cargando NASA section');

    const content = `
        <div class="nasa-container">
            <h2>Explore the Universe with NASA</h2>
            <p>Discover the latest fascinating images and data provided by NASA.</p>
            <div class="nasa-content">
                <div class="nasa-image">
                    <img id="nasaImage" alt="Image of the NASA" style="max-width: 100%; height: auto;">
                </div>
                <div class="nasa-details">
                    <h3>Image of the Day</h3>
                    <p id="nasaDescription">La imagen del día te muestra una vista única del cosmos.</p>
                </div>
                <div class="date-search">
                    <label for="datePicker">Select a date:</label>
                    <input type="date" id="datePicker" max="2030-12-31">
                    <button id="searchButton">Search by Date</button>
                </div>
                <div class="buttons">
                    <button id="downloadButton">Download Image</button>
                    <button id="shareButton">Share on Twitter</button>
                    <button id="randomButton">Random Image</button>
                </div>
               
                <div class="historial-container">
                    <h2>Recent History</h2>
                    <div id="historialGrid" class="historial-grid"></div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = content;

    // Agrega la llamada a la API de la NASA con la imagen del día
    cargarImagenDelDia();

    // Agrega el evento al botón de búsqueda por fecha
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', buscarPorFecha);

    // Descargar imagen y compartir en Twitter
    const downloadButton = document.getElementById('downloadButton');
    const shareButton = document.getElementById('shareButton');
    downloadButton.addEventListener('click', descargarImagen);
    shareButton.addEventListener('click', compartirEnTwitter);

    // Cargar imagen aleatoria
    const randomButton = document.getElementById('randomButton');
    randomButton.addEventListener('click', cargarImagenAleatoria);
}

// Utiliza tu propia clave API de la NASA
async function obtenerDatosDeNasa(date) {
    const apiKey = 'ifY1DgpF0LKQ8c3uiDLqkfpdrcHxAlFKQoIe3Pbo';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error de la API de la NASA. Código de estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos de la NASA obtenidos con éxito:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la NASA:', error);
        throw error;
    }
}


function cargarImagenDelDia() {
    // Obtiene la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Llama a la API con la fecha actual
    obtenerDatosDeNasa(today)
        .then((data) => {
            if (data) {
                // Actualiza la imagen, la descripción y el enlace con los datos de la API
                const nasaImage = document.getElementById('nasaImage');
                const nasaDescription = document.getElementById('nasaDescription');
                const nasaLink = document.getElementById('nasaLink');

                nasaImage.src = data.hdurl || data.url; // Usa url en lugar de hdurl
                nasaDescription.textContent = data.explanation;
                nasaLink.href = data.hdurl || data.url; // Enlaza al contenido de alta resolución si está disponible
            } else {
                console.error('Los datos de la NASA son undefined.');
            }
        })
        .catch((error) => {
            console.error('Error al obtener datos de la NASA:', error);
        });
}


function limpiarContenido() {
    const nasaImage = document.getElementById('nasaImage');
    const nasaDescription = document.getElementById('nasaDescription');
    const nasaLink = document.getElementById('nasaLink');


        nasaImage.src = ''; // Limpia la imagen actual
    nasaDescription.textContent = '';
    nasaLink.href = '#'; // Reinicia el enlace
}

function actualizarContenido(data) {
    const nasaImage = document.getElementById('nasaImage');
    const nasaDescription = document.getElementById('nasaDescription');
    const nasaLink = document.getElementById('nasaLink');

    nasaImage.src = data.url; // Actualiza la imagen con los nuevos datos
    nasaDescription.textContent = data.explanation;
    nasaLink.href = data.url; // Actualiza el enlace
}

function buscarPorFecha() {
    const datePicker = document.getElementById('datePicker');
    const selectedDate = datePicker.value;

    if (selectedDate) {
        // Limpia el contenido actual
        limpiarContenido();

        // Llama a la API con la fecha seleccionada
        obtenerDatosDeNasa(selectedDate)
            .then((data) => {
                actualizarContenido(data);
                
                // Actualiza el historial en el localStorage
                actualizarHistorial(selectedDate, data.url);
            })
            .catch((error) => {
                console.error('Error al obtener datos de la NASA:', error);
            });
    } else {
        console.error('Fecha no seleccionada');
    }
}

// Función para obtener el historial del localStorage
function obtenerHistorial() {
    const historial = localStorage.getItem('historial');
    return historial ? JSON.parse(historial) : [];
}

// Función para actualizar el historial en el localStorage
function actualizarHistorial(date, imageUrl) {
    const historial = obtenerHistorial();
    const nuevaEntrada = { date, imageUrl };
    historial.unshift(nuevaEntrada);

    // Limita el historial a un máximo de 5 elementos (puedes ajustar este valor)
    const historialLimitado = historial.slice(0, 5);

    localStorage.setItem('historial', JSON.stringify(historialLimitado));
    actualizarListaHistorial(historialLimitado);
}

// Función para actualizar la lista de historial en la interfaz
function actualizarListaHistorial(historial) {
    const historialGrid = document.getElementById('historialGrid');

    if (historialGrid) {
        // Limpia la cuadrícula actual
        historialGrid.innerHTML = '';

        // Agrega las nuevas entradas a la cuadrícula
        historial.forEach((entrada) => {
            // Crea una miniatura de imagen
            const thumbnail = document.createElement('img');
            thumbnail.src = entrada.imageUrl;
            thumbnail.alt = 'Thumbnail';

            // Añade la miniatura a la cuadrícula
            historialGrid.appendChild(thumbnail);

            // Agrega un evento clic para cargar la imagen al hacer clic en la miniatura
            thumbnail.addEventListener('click', () => cargarImagenPorHistorial(entrada.date, entrada.imageUrl));
        });
    } else {
        console.error('Elemento con id "historialGrid" no encontrado en el DOM.');
    }
}


// Función para cargar una imagen del historial al hacer clic en una miniatura
function cargarImagenPorHistorial(date, imageUrl) {
    // Aquí puedes cargar la imagen según la fecha y la URL de la miniatura
    // Puedes reutilizar partes de tu código existente para cargar la imagen
}

function descargarImagen() {
    const nasaImage = document.getElementById('nasaImage');
    const link = document.createElement('a');
    link.href = nasaImage.src;
    link.download = 'nasa_image.jpg';
    link.click();
}

function compartirEnTwitter() {
    //const nasaImage = document.getElementById('nasaImage');
    const nasaLink = document.getElementById('nasaLink');

    const twitterUrl = `https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20NASA%20image&url=${nasaLink.href}`;
    
    window.open(twitterUrl, '_blank');
}

function cargarImagenAleatoria() {
    // Genera una fecha aleatoria en los últimos 10 años
    const randomDate = getRandomDate();
    const formattedDate = randomDate.toISOString().split('T')[0];

    // Limpia el contenido actual
    limpiarContenido();

    // Llama a la API con la fecha aleatoria
    obtenerDatosDeNasa(formattedDate)
        .then((data) => {
            actualizarContenido(data);

            // Actualiza el historial en el localStorage
            actualizarHistorial(formattedDate, data.url);
        })
        .catch((error) => {
            console.error('Error al obtener datos de la NASA:', error);
        });
}

function getRandomDate() {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - 10;
    const endYear = currentDate.getFullYear();
    const randomYear = startYear + Math.floor(Math.random() * (endYear - startYear + 1));

    const randomMonth = Math.floor(Math.random() * 12) + 1; // Meses de 1 a 12
    const randomDay = Math.floor(Math.random() * 28) + 1; // Días de 1 a 28

    return new Date(`${randomYear}-${randomMonth}-${randomDay}`);
}

// Inicializa el historial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const historial = obtenerHistorial();
    actualizarListaHistorial(historial);
});
