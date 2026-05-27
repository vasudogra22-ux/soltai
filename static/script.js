function toggleChat(){

let panel =
document.getElementById("chatPanel");

panel.classList.toggle("active");

}

async function sendMessage(){

let input =
document.getElementById("message");

let chatBody =
document.getElementById("chatBody");

let message =
input.value;

if(message=="") return;

chatBody.innerHTML += `

<div class="user-message">
${message}
</div>

`;

input.value="";

chatBody.innerHTML += `

<div class="ai-row thinking">

<div class="mini-logo">
S
</div>

<div class="ai-message">
SOLTAI AI is thinking
</div>

</div>

`;

chatBody.scrollTop =
chatBody.scrollHeight;

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

document.querySelector(".thinking")
.remove();

chatBody.innerHTML += `

<div class="ai-row">

<div class="mini-logo">
S
</div>

<div class="ai-message">
${data.reply}
</div>

</div>

`;

chatBody.scrollTop =
chatBody.scrollHeight;

}
