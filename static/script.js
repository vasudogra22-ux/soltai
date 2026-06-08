const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("message");
const chatBody = document.querySelector(".chat-body");

sendBtn.addEventListener("click",()=>{

const text = input.value.trim();

if(text==="") return;

const user = document.createElement("div");

user.className="user-msg";
user.innerText=text;

chatBody.appendChild(user);

input.value="";

setTimeout(()=>{

const bot = document.createElement("div");

bot.className="bot-msg";

bot.innerText=
"Thank you for contacting SOLTAI AI.";

chatBody.appendChild(bot);

chatBody.scrollTop=
chatBody.scrollHeight;

},1000);

});
