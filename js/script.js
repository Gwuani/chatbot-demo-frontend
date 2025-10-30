// Wacht tot de hele pagina geladen is (belangrijk)
document.addEventListener("DOMContentLoaded", () => {

    // Pak de knop en de sidebar die we in de HTML hebben gedefinieerd
    const toggleBtn = document.getElementById("history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");

    // Voeg een 'click' event listener toe aan de knop
    // Controleer eerst of de elementen wel echt bestaan
    if (toggleBtn && historySidebar) {
        
        toggleBtn.addEventListener("click", () => {
            // Dit is de magie:
            // voeg de class 'collapsed' toe als hij er niet is,
            // of verwijder hem als hij er wel is.
            historySidebar.classList.toggle("collapsed");
        });
    }

});