// Wacht tot de hele pagina geladen is
document.addEventListener("DOMContentLoaded", () => {
    // Pak ALLE knoppen met de class 'history-toggle-btn'
    const toggleButtons = document.querySelectorAll(".history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");
    const overlay = document.getElementById("history-overlay");

    // Functie om alles te openen/sluiten
    const toggleMenu = () => {
        historySidebar.classList.toggle("is-open");
        document.body.classList.toggle("history-open");
    };

    // Koppel de functie aan ELKE knop
    if (toggleButtons.length > 0 && historySidebar) {
        toggleButtons.forEach(button => {
            button.addEventListener("click", toggleMenu);
        });
    }

    // Koppel de functie aan de overlay
    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }
});