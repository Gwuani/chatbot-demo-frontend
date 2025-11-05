document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle knoppen
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

    // Dark mode toggle
    const darkModeToggleLogo = document.getElementById("dark-mode-toggle-logo");

    if (darkModeToggleLogo) {
        darkModeToggleLogo.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Nieuwe chat knop
    const newChatBtn = document.querySelector('.new-chat-btn');

    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            // If there's a pending bot response, wait for it to complete before saving
            if (chatMessages.dataset.pendingBotResponse) {
                // Don't cancel the timeout, let it complete and then save
                setTimeout(() => {
                    // After bot response completes, save the conversation
                    saveCurrentConversation();
                    resetChat();
                }, 1100); // Slightly longer than the bot response delay
            } else {
                // No pending response, save immediately
                saveCurrentConversation();
                resetChat();
            }
        });

        const saveCurrentConversation = () => {
            const messagesContainer = document.querySelector('.chat-messages');
            if (!messagesContainer) return;

            const userMessages = messagesContainer.querySelectorAll('.user-message');
            if (userMessages.length === 0) return; // Only save if there are user messages

            const messages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
                text: msg.querySelector('p').textContent,
                type: msg.classList.contains('user-message') ? 'user' : 'bot'
            }));

            // Generate a title based on the first user message
            const userMsgs = messages.filter(msg => msg.type === 'user');
            let title = userMsgs.length > 0
                ? (userMsgs[0].text.length > 30 ? userMsgs[0].text.substring(0, 30) + '...' : userMsgs[0].text)
                : `Chat ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`;

            // Check if a chat with this title already exists, if so update it
            const historyList = document.querySelector('.chat-history-list');
            if (!historyList) return;

            let existingItem = null;
            const historyItems = historyList.querySelectorAll('li a');
            for (let item of historyItems) {
                if (item.textContent === title) {
                    existingItem = item;
                    break;
                }
            }

            if (existingItem) {
                // Update existing chat
                existingItem.setAttribute('data-messages', JSON.stringify(messages));
            } else {
                // Add new chat to history list
                const newHistoryItem = document.createElement('li');
                newHistoryItem.innerHTML = `<a href="#" data-messages='${JSON.stringify(messages)}'>${title}</a>`;
                historyList.insertBefore(newHistoryItem, historyList.firstChild);
                // Attach listener to the new link
                attachHistoryListeners();
            }
        };

        const resetChat = () => {
            const messagesContainer = document.querySelector('.chat-messages');

            // Clear and reset chat
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
            attachHistoryListeners();
        };
    }

    // Chat elementen
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.querySelector(".chat-messages");

    // Bericht toevoegen aan chat
    const appendMessage = (text, type) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
        const p = document.createElement("p");
        p.textContent = text;
        messageDiv.appendChild(p);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Berichten verzenden afhandelen - HIER BACKEND INTEGRATIE TOEVOEGEN
    const handleSendMessage = (messageText) => {
        const text = messageText.trim();
        if (text === "") return;

        // User bericht tonen
        appendMessage(text, "user-message");

        // Input veld legen
        if (chatInput.value !== "") {
            chatInput.value = "";
        }

        // Suggestieknoppen verbergen
        const repliesContainer = document.querySelector(".quick-replies");
        if (repliesContainer) {
            repliesContainer.style.display = "none";
        }

        // PYTHON BACKEND INTEGRATIE - Vervang deze timeout door echte API call
        // Voorbeeld:
        // fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message: text })
        // })
        // .then(response => response.json())
        // .then(data => appendMessage(data.response, "bot-message"))
        // .catch(error => appendMessage("Fout bij verbinden met backend", "bot-message"));

        setTimeout(() => {
            appendMessage("Bedankt voor uw bericht!", "bot-message");
            delete chatMessages.dataset.pendingBotResponse;
        }, 1000);

        chatMessages.dataset.pendingBotResponse = timeoutId;
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

    const loadChat = (messages) => {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = '';
        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message", msg.type === 'user' ? "user-message" : "bot-message");
            const p = document.createElement("p");
            p.textContent = msg.text;
            messageDiv.appendChild(p);
            messagesContainer.appendChild(messageDiv);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.value = '';
        }

        if (window.innerWidth <= 1024) {
            historySidebar.classList.remove("is-open");
            document.body.classList.remove("history-open");
        }

        // Clear any pending bot responses when loading a chat
        if (messagesContainer.dataset.pendingBotResponse) {
            clearTimeout(messagesContainer.dataset.pendingBotResponse);
            delete messagesContainer.dataset.pendingBotResponse;
        }
    };

    const attachHistoryListeners = () => {
        const historyLinks = document.querySelectorAll('.chat-history-list a');
        historyLinks.forEach(link => {
            // Remove existing listeners to avoid duplicates
            link.removeEventListener('click', handleHistoryClick);
            link.addEventListener('click', handleHistoryClick);
        });
    };

    const handleHistoryClick = (e) => {
        e.preventDefault();
        // Save the current conversation before loading a new one
        saveCurrentConversation();
        const messages = JSON.parse(e.target.getAttribute('data-messages'));
        loadChat(messages);
    };

    // Event listeners
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