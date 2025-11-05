document.addEventListener("DOMContentLoaded", () => {
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

    const darkModeToggleLogo = document.getElementById("dark-mode-toggle-logo");

    if (darkModeToggleLogo) {
        darkModeToggleLogo.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    const newChatBtn = document.querySelector('.new-chat-btn');

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            const messagesContainer = document.querySelector('.chat-messages');
            if (messagesContainer) {
                messagesContainer.innerHTML = `
                    <div class="message bot-message" id="initial-bot-message">
                        <p>Hoi! Ik ben Stijn. Waar kan ik je vandaag mee helpen?</p>
                    </div>
                    <div class="quick-replies">
                        <button class="quick-reply-btn" data-value="Mijn rooster inzien">Mijn rooster inzien</button>
                        <button class="quick-reply-btn" data-value="Vakantie aanvragen">Vakantie aanvragen</button>
                        <button class="quick-reply-btn" data-value="Hoe meld ik me ziek?">Ziek melden</button>
                        <button class="quick-reply-btn" data-value="Declaratie indienen">Declaratie indienen</button>
                    </div>
                `;
            }

            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = '';
            }

            if (window.innerWidth <= 1024) {
                historySidebar.classList.remove("is-open");
                document.body.classList.remove("history-open");
            }

            // Re-attach event listeners to the new quick reply buttons
            attachQuickReplyListeners();
        });
    }

    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.querySelector(".chat-messages");

    const appendMessage = (text, type) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        const p = document.createElement("p");
        p.textContent = text;
        messageDiv.appendChild(p);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleSendMessage = (messageText) => {
        const text = messageText.trim();
        if (text === "") return;
        appendMessage(text, "user-message");
        if (chatInput.value !== "") {
            chatInput.value = "";
        }
        const repliesContainer = document.querySelector(".quick-replies");
        if (repliesContainer) {
            repliesContainer.style.display = "none";
        }
        setTimeout(() => {
            appendMessage("Bedankt voor uw bericht!", "bot-message");
        }, 1000);
    };

    const attachQuickReplyListeners = () => {
        const quickReplyButtons = document.querySelectorAll(".quick-reply-btn");
        quickReplyButtons.forEach(button => {
            button.addEventListener("click", () => {
                const message = button.getAttribute("data-value");
                handleSendMessage(message);
            });
        });
    };

    if (sendBtn) {
        sendBtn.addEventListener("click", () => handleSendMessage(chatInput.value));
    }

    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSendMessage(chatInput.value);
            }
        });
    }

    attachQuickReplyListeners();
});