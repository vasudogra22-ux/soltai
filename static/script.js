const floatingLogo = document.querySelector(".floating-logo");
const chatPopup = document.querySelector(".chat-popup");
const sendBtn = document.querySelector(".send-btn");
const input = document.querySelector(".chat-input");
const messages = document.querySelector(".chat-messages");

/* OPEN CLOSE CHAT */

floatingLogo.addEventListener("click", () => {
  chatPopup.classList.toggle("active");
});

/* SEND MESSAGE */

function sendMessage() {

  const text = input.value.trim();

  if(text === "") return;

  /* USER MESSAGE */

  const userMsg = document.createElement("div");

  userMsg.className = "user-message";

  userMsg.innerHTML = `
    <div class="bubble user-bubble">
      ${text}
    </div>
  `;

  messages.appendChild(userMsg);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;

  /* THINKING */

  const thinking = document.createElement("div");

  thinking.className = "bot-message thinking";

  thinking.innerHTML = `
      <div class="bot-row">
          <div class="bot-logo">S</div>

          <div class="bubble bot-bubble">
             SOLTAI ASSIST is thinking
          </div>
      </div>
  `;

  messages.appendChild(thinking);

  messages.scrollTop = messages.scrollHeight;

  /* BOT REPLY */

  setTimeout(() => {

      thinking.remove();

      const reply = document.createElement("div");

      reply.className = "bot-message";

      reply.innerHTML = `
        <div class="bot-row">

          <div class="bot-logo">
             S
          </div>

          <div class="bubble bot-bubble">

            Welcome to SOLTAI AI.

            I can help with:

            • AI Chatbots

            • AI Assistants

            • B2B AI Solutions

            • Business Automation

            • Custom AI Development

          </div>

        </div>
      `;

      messages.appendChild(reply);

      messages.scrollTop = messages.scrollHeight;

  },1500);

}

/* BUTTON */

sendBtn.addEventListener("click", sendMessage);

/* ENTER */

input.addEventListener("keypress", function(e){

  if(e.key === "Enter"){

      sendMessage();

  }

});

/* DEFAULT WELCOME */

window.onload = () => {

  const welcome = document.createElement("div");

  welcome.className = "bot-message";

  welcome.innerHTML = `
      <div class="bot-row">

        <div class="bot-logo">
          S
        </div>

        <div class="bubble bot-bubble">

          Hello 👋

          Welcome to SOLTAI AI.

          How can I help you today?

        </div>

      </div>
  `;

  messages.appendChild(welcome);

};<div class="mini-logo">
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
