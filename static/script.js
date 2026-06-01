// ELEMENTS

const chatToggle =
document.getElementById("chatToggle");

const chatWindow =
document.getElementById("chatWindow");

const closeBtn =
document.getElementById("closeBtn");

const minimizeBtn =
document.getElementById("minimizeBtn");

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatMessages =
document.getElementById("chatMessages");

const quickButtons =
document.querySelectorAll(".quick-question");


// OPEN CHAT

chatToggle.addEventListener("click", () => {

    chatWindow.classList.remove("hidden");

});


// CLOSE CHAT

closeBtn.addEventListener("click", () => {

    chatWindow.classList.add("hidden");

});


// MINIMIZE

minimizeBtn.addEventListener("click", () => {

    chatWindow.classList.toggle("minimized");

});


// SEND MESSAGE

async function sendMessage(messageText = null){

    const message =
    messageText || userInput.value.trim();

    if(message === "") return;

    // USER MESSAGE

    chatMessages.innerHTML += `

    <div class="user-message">

        ${message}

    </div>

    `;

    chatMessages.scrollTop =
    chatMessages.scrollHeight;

    userInput.value = "";



    // THINKING

    const thinkingId =
    "thinking-" + Date.now();

    chatMessages.innerHTML += `

    <div
    class="bot-message"
    id="${thinkingId}">

    <strong>
    SOLTAI Assist
    </strong>

    <br><br>

    SOLTAI is thinking...

    </div>

    `;

    chatMessages.scrollTop =
    chatMessages.scrollHeight;


    try{

        const response =
        await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:message

            })

        });

        const data =
        await response.json();



        // REMOVE THINKING

        const thinking =
        document.getElementById(thinkingId);

        if(thinking){

            thinking.remove();

        }



        // BOT MESSAGE

        chatMessages.innerHTML += `

        <div class="bot-message">

        <strong>
        SOLTAI Assist
        </strong>

        <br><br>

        ${data.reply}

        </div>

        `;

        chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }

    catch(error){

        const thinking =
        document.getElementById(thinkingId);

        if(thinking){

            thinking.remove();

        }

        chatMessages.innerHTML += `

        <div class="bot-message">

        <strong>
        Error
        </strong>

        <br><br>

        Unable to connect to SOLTAI AI.

        </div>

        `;

    }

}


// BUTTON CLICK

sendBtn.addEventListener("click", () => {

    sendMessage();

});


// ENTER KEY

userInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        sendMessage();

    }

});


// QUICK QUESTIONS

quickButtons.forEach(button => {

    button.addEventListener("click", () => {

        sendMessage(
            button.innerText
        );

    });

});
