// Wacht tot de hele pagina geladen is
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");
    const overlay = document.getElementById("history-overlay");

    // Functie om alles te openen/sluiten
    const toggleMenu = () => {
        // We gebruiken 'is-open' in plaats van 'collapsed'
        historySidebar.classList.toggle("is-open");
        document.body.classList.toggle("history-open");
    };

    // Koppel de functie aan de knop
    if (toggleBtn && historySidebar) {
        toggleBtn.addEventListener("click", toggleMenu);
    }

    // Koppel de functie aan de overlay
    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }
});