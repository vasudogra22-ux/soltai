// CHAT ELEMENTS

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// OPEN CHAT

chatToggle.addEventListener("click", () => {
    chatWindow.style.display = "flex";
});

// CLOSE CHAT

closeChat.addEventListener("click", () => {
    chatWindow.style.display = "none";
});

// SEND MESSAGE

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    // USER MESSAGE

    const userDiv = document.createElement("div");
    userDiv.className = "user-msg";
    userDiv.innerText = message;

    chatMessages.appendChild(userDiv);

    userInput.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // TYPING MESSAGE

    const typingDiv = document.createElement("div");
    typingDiv.className = "bot-msg";
    typingDiv.innerText = "SOLTAI is thinking...";

    chatMessages.appendChild(typingDiv);

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

        typingDiv.remove();

        const botDiv = document.createElement("div");
        botDiv.className = "bot-msg";

        botDiv.innerText =
            data.reply || "Sorry, I couldn't process that.";

        chatMessages.appendChild(botDiv);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }

    catch (error) {

        typingDiv.remove();

        const errorDiv = document.createElement("div");
        errorDiv.className = "bot-msg";

        errorDiv.innerText =
            "Server connection failed.";

        chatMessages.appendChild(errorDiv);

        console.error(error);

    }

}

// BUTTON CLICK

sendBtn.addEventListener("click", sendMessage);

// ENTER KEY

userInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});
