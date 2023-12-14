// subscriptionSection.mjs
export function loadSubscriptionSection(container) {
    console.log('Cargando Subscription section');

    const content = `
        <div class="subscription-container">
            <h2>Subscribe to receive updates</h2>
            <form id="subscriptionForm">
                <label for="firstName">Name:</label>
                <input type="text" id="firstName" name="firstName" required>

                <label for="lastName">LastName:</label>
                <input type="text" id="lastName" name="lastName" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="country">Country:</label>
                <select id="country" name="country" required>
                    <option value="usa">United States</option>
                    <option value="argentina">Argentina</option>
                    <option value="canada">Canadá</option>
                    <option value="chile">Chile</option>
                    
                </select>

                <input type="submit" value="Subscribe">
            </form>
            <div id="subscriptionHistory"></div>
        </div>
    `;

    container.innerHTML = content;

    const subscriptionForm = document.getElementById('subscriptionForm');
    const subscriptionHistoryContainer = document.getElementById('subscriptionHistory');

    subscriptionForm.addEventListener('submit', handleSubscription);

    function handleSubscription(event) {
        event.preventDefault();

        // Obtén los valores del formulario
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const country = document.getElementById('country').value;

        // Guarda en Local Storage
        const subscriptionData = {
            firstName,
            lastName,
            email,
            country,
            timestamp: new Date().toLocaleString(),
        };

        // Obtén el historial actual o inicializa si no existe
        const subscriptionHistory = JSON.parse(localStorage.getItem('subscriptionHistory')) || [];

        // Agrega el nuevo registro al historial
        subscriptionHistory.push(subscriptionData);

        // Actualiza Local Storage
        localStorage.setItem('subscriptionHistory', JSON.stringify(subscriptionHistory));

        // Limpia el formulario
        subscriptionForm.reset();

        // Muestra el historial actualizado
        showSubscriptionHistory();
    }

    // Función para mostrar el historial de suscripciones
    function showSubscriptionHistory() {
        const subscriptionHistory = JSON.parse(localStorage.getItem('subscriptionHistory')) || [];
        
        if (subscriptionHistory.length > 0) {
            const historyContent = `
                <h3>Subscription History</h3>
                <ul>
                    ${subscriptionHistory.map(entry => `<li>${entry.firstName} ${entry.lastName} - ${entry.email} (${entry.country}, ${entry.timestamp})</li>`).join('')}
                </ul>
            `;

            subscriptionHistoryContainer.innerHTML = historyContent;
        }
    }

    // Muestra el historial al cargar la sección
    showSubscriptionHistory();
}
