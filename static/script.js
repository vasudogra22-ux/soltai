const assistantBar = document.getElementById("assistantInput");
const responseArea = document.getElementById("responseArea");
const sendBtn = document.getElementById("sendBtn");

async function sendMessage() {

    const message = assistantBar.value.trim();

    if(message === "") return;

    responseArea.innerHTML = `
        <div class="answer-card thinking-box">
            SOLTAI is thinking...
        </div>
    `;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        responseArea.innerHTML = `
            <div class="answer-card">
                <strong>SOLTAI Assist:</strong><br><br>
                ${data.reply}
            </div>
        `;

    } catch(error){

        responseArea.innerHTML = `
            <div class="answer-card">
                Unable to connect with SOLTAI AI.
            </div>
        `;

        console.log(error);
    }

    assistantBar.value = "";
}

sendBtn.addEventListener("click", sendMessage);

assistantBar.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        sendMessage();
    }

});
