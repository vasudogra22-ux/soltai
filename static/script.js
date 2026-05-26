function toggleChat(){

    let chat =
    document.getElementById("chatBox");

    if(chat.style.display === "flex"){

        chat.style.display = "none";

    }else{

        chat.style.display = "flex";
    }
}



async function sendMessage(){

    let input =
    document.getElementById("message");

    let message = input.value;

    if(message === "") return;

    let chatBody =
    document.getElementById("chatBody");


    // USER MESSAGE

    chatBody.innerHTML += `

    <div class="user-message">
        ${message}
    </div>

    `;


    // THINKING

    chatBody.innerHTML += `

    <div class="ai-message thinking"
    id="thinking">

        SOLTAI AI is thinking

    </div>

    `;

    chatBody.scrollTop =
    chatBody.scrollHeight;


    input.value = "";


    let response =
    await fetch("/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message
        })
    });


    let data =
    await response.json();


    // REMOVE THINKING

    document
    .getElementById("thinking")
    .remove();


    // AI REPLY

    chatBody.innerHTML += `

    <div class="ai-message">

        ${data.reply}

    </div>

    `;


    chatBody.scrollTop =
    chatBody.scrollHeight;

}  
