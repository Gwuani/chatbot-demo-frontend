// =======================================
// CHATBOT FRONTEND SCRIPT
// =======================================
// Dit script beheert de UI interacties voor de chatbot interface.
// Het regelt de sidebar toggle, overlay en dark mode functionaliteit.

// Wacht tot de pagina volledig geladen is
document.addEventListener("DOMContentLoaded", () => {

    // =======================================
    // SIDEBAR TOGGLE FUNCTIONALITEIT
    // =======================================
    // Beheert het openen/sluiten van de chat geschiedenis sidebar

    // Haal alle toggle knoppen op (desktop en mobiele versies)
    const toggleButtons = document.querySelectorAll(".history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");
    const overlay = document.getElementById("history-overlay");

    // Functie om sidebar open/dicht te schakelen
    const toggleMenu = () => {
        historySidebar.classList.toggle("is-open");
        document.body.classList.toggle("history-open");
    };

    // Voeg klik event listeners toe aan alle toggle knoppen
    if (toggleButtons.length > 0 && historySidebar) {
        toggleButtons.forEach(button => {
            button.addEventListener("click", toggleMenu);
        });
    }

    // Voeg klik event listener toe aan overlay (sluit sidebar bij klik)
    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }

    // =======================================
    // DARK MODE TOGGLE FUNCTIONALITEIT
    // =======================================
    // Beheert het schakelen tussen licht en donker thema

    const darkModeToggleLogo = document.getElementById("dark-mode-toggle-logo");

    if (darkModeToggleLogo) {
        darkModeToggleLogo.addEventListener("click", () => {
            // Toggle de 'dark-mode' class op het body element
            // CSS variabelen zullen automatisch het thema bijwerken
            document.body.classList.toggle("dark-mode");
        });
    }

    // =======================================
    // BACKEND INTEGRATIE NOTITIES
    // =======================================
    // Voor backend ontwikkelaars:
    // - Chat berichten kunnen toegevoegd worden aan .chat-messages container
    // - Gebruik .bot-message en .user-message classes voor styling
    // - Chat geschiedenis items kunnen dynamisch toegevoegd worden aan .chat-history-list
    // - Dark mode status kan opgeslagen worden in localStorage indien nodig

});