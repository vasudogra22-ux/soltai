// ==========================
// ELEMENTS
// ==========================

const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");

const closeBtn = document.getElementById("closeBtn");
const minimizeBtn = document.getElementById("minimizeBtn");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

const chatMessages =
document.getElementById("chatMessages");


// ==========================
// OPEN CHAT
// ==========================

chatToggle.addEventListener("click", () => {

    chatBox.classList.toggle("active");

});


// ==========================
// CLOSE CHAT
// ==========================

closeBtn.addEventListener("click", () => {

    chatBox.classList.remove("active");

});


// ==========================
// MINIMIZE CHAT
// ==========================

let minimized = false;

minimizeBtn.addEventListener("click", () => {

    if(!minimized){

        chatMessages.style.display = "none";

        document.querySelector(
            ".chat-input-area"
        ).style.display = "none";

        chatBox.style.height = "80px";

        minimized = true;

    }else{

        chatMessages.style.display = "block";

        document.querySelector(
            ".chat-input-area"
        ).style.display = "flex";

        chatBox.style.height = "620px";

        minimized = false;

    }

});


// ==========================
// SEND MESSAGE
// ==========================

async function sendMessage(customText = null){

    const message =
    customText || userInput.value.trim();

    if(!message) return;

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
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                message:message

            })

        });

        const data =
        await response.json();

        const thinking =
        document.getElementById(
            thinkingId
        );

        if(thinking){
            thinking.remove();
        }


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
        document.getElementById(
            thinkingId
        );

        if(thinking){
            thinking.remove();
        }

        chatMessages.innerHTML += `

            <div class="bot-message">

            <strong>Error</strong>

            <br><br>

            Unable to connect
            with SOLTAI AI.

            </div>

        `;

        console.error(error);

    }

}


// ==========================
// SEND BUTTON
// ==========================

sendBtn.addEventListener("click", () => {

    sendMessage();

});


// ==========================
// ENTER KEY
// ==========================

userInput.addEventListener(
"keypress",
function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});


// ==========================
// QUICK QUESTIONS
// ==========================

function askQuestion(question){

    sendMessage(question);

}

window.askQuestion =
askQuestion;
