// =======================================
// CHATBOT FRONTEND SCRIPT
// =======================================
// Dit script regelt alle frontend interacties.
//
// Sidebar toggle: Opent/sluit de linker sidebar met chat geschiedenis
// Dark mode toggle: Schakelt tussen licht/donker thema
// Event listeners: Voor alle knoppen en interacties

document.addEventListener("DOMContentLoaded", () => {

    // Sidebar toggle functionaliteit
    const toggleButtons = document.querySelectorAll(".history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");
    const overlay = document.getElementById("history-overlay");

    const toggleMenu = () => {
        historySidebar.classList.toggle("is-open");
        document.body.classList.toggle("history-open");
    };

    if (toggleButtons.length > 0 && historySidebar) {
        toggleButtons.forEach(button => button.addEventListener("click", toggleMenu));
    }

    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }

    // Dark mode toggle functionaliteit
    const darkModeToggleLogo = document.getElementById("dark-mode-toggle-logo");

    if (darkModeToggleLogo) {
        darkModeToggleLogo.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // =======================================
    // BACKEND INTEGRATIE - HIER TOEVOEGEN
    // =======================================
    // Gebruik deze elementen voor je backend connectie:
    // const sendBtn = document.getElementById('send-btn');
    // const chatInput = document.getElementById('chat-input');
    // const messagesContainer = document.querySelector('.chat-messages');
    // const historyList = document.querySelector('.chat-history-list');

});