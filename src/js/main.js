// main.js
import { loadHomeSection } from './homeSection.mjs';
import { loadSubscriptionSection } from './subscriptionSection.mjs';
import { loadNasaSection } from './nasaSection.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('homeLink');
    const subscriptionLink = document.getElementById('subscriptionLink');
    const nasaLink = document.getElementById('nasaLink');

    // Maneja la navegación a las diferentes secciones
    homeLink.addEventListener('click', () => {
        loadHomeSection(document.getElementById('mainContent'));
    });

    subscriptionLink.addEventListener('click', () => {
        loadSubscriptionSection(document.getElementById('mainContent'));
    });
    
    nasaLink.addEventListener('click', () => {
        loadNasaSection(document.getElementById('mainContent'));
    });

    // Carga la sección de inicio por defecto
    loadHomeSection(document.getElementById('mainContent'));
});
