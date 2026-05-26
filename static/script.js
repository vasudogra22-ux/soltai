const chatBody =
document.getElementById("chatBody");


async function sendMessage(){

let input =
document.getElementById("message");

let message =
input.value;

if(message === "") return;


// USER MESSAGE

chatBody.innerHTML += `

<div class="user">

<div class="bubble">

${message}

</div>

</div>

`;


// THINKING

chatBody.innerHTML += `

<div class="ai"
id="thinking">

<div class="ai-logo">
S
</div>

<div class="bubble thinking">

SOLTAI AI is thinking

</div>

</div>

`;


chatBody.scrollTop =
chatBody.scrollHeight;


input.value = "";


// API

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


// AI MESSAGE

chatBody.innerHTML += `

<div class="ai">

<div class="ai-logo">
S
</div>

<div class="bubble">

${data.reply}

</div>

</div>

`;


chatBody.scrollTop =
chatBody.scrollHeight;

}
