// Wacht tot de hele pagina geladen is
document.addEventListener("DOMContentLoaded", () => {

    // =======================================
    // 1. SIDEBAR TOGGLE FUNCTIONALITEIT
    // =======================================
    // (Deze code had je al)
    const toggleButtons = document.querySelectorAll(".history-toggle-btn");
    const historySidebar = document.getElementById("history-sidebar");
    const overlay = document.getElementById("history-overlay");

    const toggleMenu = () => {
        historySidebar.classList.toggle("is-open");
        document.body.classList.toggle("history-open");
    };

    if (toggleButtons.length > 0 && historySidebar) {
        toggleButtons.forEach(button => {
            button.addEventListener("click", toggleMenu);
        });
    }
    
    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }

    // =======================================
    // 2. DARK MODE TOGGLE FUNCTIONALITEIT
    // =======================================
    // (Deze code had je al)
    const darkModeToggleLogo = document.getElementById("dark-mode-toggle-logo");

    if (darkModeToggleLogo) {
        darkModeToggleLogo.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // =======================================
    // 3. NIEUWE CHAT FUNCTIE
    // =======================================
    const newChatBtn = document.querySelector('.new-chat-btn');

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            // Leeg de berichten container en herstel de begroeting
            const messagesContainer = document.querySelector('.chat-messages');
            if (messagesContainer) {
                messagesContainer.innerHTML = '<div class="message bot-message" id="initial-bot-message"><p>Hoi! Ik ben Stijn. Waar kan ik je vandaag mee helpen?</p></div><div class="quick-replies"><button class="quick-reply-btn" data-value="Mijn rooster inzien">Mijn rooster inzien</button><button class="quick-reply-btn" data-value="Vakantie aanvragen">Vakantie aanvragen</button><button class="quick-reply-btn" data-value="Hoe meld ik me ziek?">Ziek melden</button><button class="quick-reply-btn" data-value="Declaratie indienen">Declaratie indienen</button></div>';
            }

            // Leeg het input veld
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = '';
            }

            // Sluit de sidebar op mobiel
            if (window.innerWidth <= 1024) {
                historySidebar.classList.remove("is-open");
                document.body.classList.remove("history-open");
            }

            // Herstel de event listeners voor de nieuwe knoppen
            setTimeout(() => {
                const newQuickReplyButtons = document.querySelectorAll(".quick-reply-btn");
                newQuickReplyButtons.forEach(button => {
                    button.addEventListener("click", () => {
                        const message = button.getAttribute("data-value");
                        handleSendMessage(message);
                    });
                });
            }, 100);
        });
    }

    // =======================================
    // 4. CHAT BERICHTEN FUNCTIONALITEIT (NIEUW)
    // =======================================

    // Pak de HTML-elementen die we nodig hebben voor de chat
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.querySelector(".chat-messages");
    const quickReplyButtons = document.querySelectorAll(".quick-reply-btn"); // De suggestieknoppen

    /**
     * Hulpfunctie: Maakt een nieuwe bericht-bubbel aan en voegt deze toe aan de chat
     * @param {string} text - De tekst van het bericht
     * @param {string} type - 'user-message' of 'bot-message'
     */
    const appendMessage = (text, type) => {
        // Maak de hoof-div voor het bericht
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        
        // Maak een <p> tag voor de tekst zelf
        const p = document.createElement("p");
        p.textContent = text;
        messageDiv.appendChild(p); // Stop de <p> in de <div>
        
        // Voeg de complete bubbel toe aan het chat-venster
        chatMessages.appendChild(messageDiv);
        
        // Scroll automatisch naar het nieuwste bericht
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    /**
     * Hoofdfunctie voor het verwerken van een bericht (zowel getypt als geklikt)
     * @param {string} messageText - De tekst die de gebruiker verstuurt
     */
    const handleSendMessage = (messageText) => {
        const text = messageText.trim();
        if (text === "") return; // Verstuur geen lege berichten

        // 1. Toon het bericht van de gebruiker direct
        appendMessage(text, "user-message");
        
        // 2. Maak het invoerveld leeg (als de bron de input was)
        if (chatInput.value !== "") {
            chatInput.value = "";
        }
        
        // 3. Verberg de suggestieknoppen (als ze er nog zijn)
        const repliesContainer = document.querySelector(".quick-replies");
        if (repliesContainer) {
            repliesContainer.style.display = "none";
        }

        // 4. Simuleer een bot-antwoord na 1 seconde
        setTimeout(() => {
            // Dit is de reactie die je wilde:
            appendMessage("bedankt voor u bericht!!!", "bot-message");
        }, 1000); // 1000ms = 1 seconde wachttijd
    };

    // --- Koppel de event listeners ---

    // 1. Koppel de 'Verstuur' knop
    if (sendBtn) {
        sendBtn.addEventListener("click", () => handleSendMessage(chatInput.value));
    }

    // 2. Koppel de 'Enter' toets
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSendMessage(chatInput.value);
            }
        });
    }
    
    // 3. Koppel de Suggestieknoppen
    quickReplyButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Pak de tekst uit het 'data-value' attribuut
            const message = button.getAttribute("data-value");
            handleSendMessage(message);
        });
    });

});