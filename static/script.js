const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");

chatToggle.addEventListener("click", () => {
    chatbot.classList.add("show");
});

closeChat.addEventListener("click", () => {
    chatbot.classList.remove("show");
});

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    chatBody.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    userInput.value = "";

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

        chatBody.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        chatBody.scrollTop = chatBody.scrollHeight;

    } catch (error) {

        chatBody.innerHTML += `
            <div class="bot-message">
                Error connecting to SOLTAI AI
            </div>
        `;
    }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});
