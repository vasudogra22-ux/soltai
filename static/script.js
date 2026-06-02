// =========================
// SOLTAI CHATBOT
// =========================

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// Open Chat
chatToggle.addEventListener("click", () => {
    chatWindow.classList.remove("hidden");
});

// Close Chat
closeChat.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
});

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    // User Message
    addUserMessage(message);

    userInput.value = "";

    // Loading
    const loadingDiv = document.createElement("div");

    loadingDiv.className =
        "bg-white/5 rounded-2xl p-4 text-gray-300";

    loadingDiv.id = "loading-message";

    loadingDiv.innerHTML = "SOLTAI is thinking...";

    chatMessages.appendChild(loadingDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        document.getElementById("loading-message")?.remove();

        addBotMessage(
            data.reply ||
            "Sorry, I couldn't generate a response."
        );

    } catch (error) {

        document.getElementById("loading-message")?.remove();

        addBotMessage(
            "Server connection error. Please try again."
        );

        console.error(error);
    }
}

// =========================
// USER MESSAGE
// =========================

function addUserMessage(text) {

    const div = document.createElement("div");

    div.className =
        "bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 ml-auto max-w-[80%]";

    div.innerHTML = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

// =========================
// BOT MESSAGE
// =========================

function addBotMessage(text) {

    const div = document.createElement("div");

    div.className =
        "bg-white/5 rounded-2xl p-4 max-w-[85%]";

    div.innerHTML = `
        <strong>SOLTAI AI:</strong><br>
        ${text}
    `;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}
