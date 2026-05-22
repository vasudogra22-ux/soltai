function openChat(){

let chat =
document.getElementById("chatBox");

if(chat.style.display === "block"){

chat.style.display = "none";

}

else{

chat.style.display = "block";

}

}

async function sendMessage(){

let input =
document.getElementById("messageInput");

let message =
input.value;

if(message.trim() === ""){
return;
}

let chatBody =
document.querySelector(".chat-body");

chatBody.innerHTML +=
"<p><b>You:</b> "
+ message +
"</p>";

input.value = "";

let response =
await fetch(
"http://127.0.0.1:5000/chat",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:message
})
}
);

let data =
await response.json();

chatBody.innerHTML +=
"<p><b>AI:</b> "
+ data.reply +
"</p>";

chatBody.scrollTop =
chatBody.scrollHeight;

}
