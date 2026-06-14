/* ============================================================
   SOLTAI Chat Widget — Embeddable AI Chatbot
   6 Premium Designs: aurora, mono, bubblepop, neon, softcard, executive
   Usage:
   <script
     src="https://soltai.onrender.com/widget.js"
     data-config="BASE64_ENCODED_JSON"
     data-theme="aurora"
     async>
   </script>
   ============================================================ */
(function () {
  "use strict";

  var thisScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  /* ---------- Read config ---------- */
  var rawConfig = thisScript.getAttribute('data-config');
  var config = {};
  if (rawConfig) {
    try { config = JSON.parse(decodeURIComponent(escape(atob(rawConfig)))); }
    catch (e) { try { config = JSON.parse(rawConfig); } catch (e2) { config = {}; } }
  }

  var botName = config.botname || thisScript.getAttribute('data-bot-name') || 'Assistant';
  var welcome = config.welcome || thisScript.getAttribute('data-welcome') || 'Hello! How can I help you today?';
  var businessType = config.btype || thisScript.getAttribute('data-business') || 'Other';
  var businessName = config.name || thisScript.getAttribute('data-business-name') || '';
  var theme = (thisScript.getAttribute('data-theme') || 'aurora').toLowerCase();
  var position = (thisScript.getAttribute('data-position') || 'right').toLowerCase();
  var apiUrl = thisScript.getAttribute('data-api') || 'https://soltai.onrender.com/chat';

  /* ============================================================
     DESIGN PRESETS — 6 distinct visual styles
     ============================================================ */
  var PRESETS = {

    /* 1. AURORA — Glassmorphism, frosted blur, purple-blue gradient */
    aurora: {
      font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
      winBg: 'linear-gradient(160deg, rgba(40,30,70,0.85), rgba(20,30,60,0.85))',
      blur: true,
      headerBg: 'linear-gradient(120deg, rgba(167,139,250,0.28), rgba(96,165,250,0.18))',
      border: 'rgba(255,255,255,0.14)',
      text: '#f5f3ff', textSub: '#c9bdf5',
      botBubble: 'rgba(255,255,255,0.09)', botBorder: 'rgba(255,255,255,0.10)', botText: '#ede9fe',
      userBubble: 'linear-gradient(135deg,#a78bfa,#60a5fa)', userText: '#ffffff',
      fabBg: 'linear-gradient(135deg,#a78bfa,#60a5fa)', fabShape: '50%', fabIcon: '#ffffff', fabBorder: 'none',
      winRadius: '22px', bubbleRadius: '16px', inputBg: 'rgba(255,255,255,0.08)', inputBorder: 'rgba(255,255,255,0.16)',
      sendBg: 'linear-gradient(135deg,#a78bfa,#60a5fa)', sendIcon: '#ffffff',
      shadow: '0 10px 40px rgba(120,100,255,0.30)', dot: '#a78bfa', anim: 'pulse'
    },

    /* 2. MONO — Ultra minimal editorial, black & white, serif */
    mono: {
      font: "'Georgia','Playfair Display',serif",
      winBg: '#ffffff', blur: false,
      headerBg: '#0a0a0a',
      border: '#111111',
      text: '#111111', textSub: '#888888',
      botBubble: '#f4f4f4', botBorder: '#e8e8e8', botText: '#111111',
      userBubble: '#111111', userText: '#ffffff',
      fabBg: '#0a0a0a', fabShape: '10px', fabIcon: '#ffffff', fabBorder: '1.5px solid #0a0a0a',
      winRadius: '6px', bubbleRadius: '3px', inputBg: '#fafafa', inputBorder: '#dcdcdc',
      sendBg: '#111111', sendIcon: '#ffffff',
      shadow: '0 16px 48px rgba(0,0,0,0.18)', dot: '#ffffff', anim: 'fade',
      headerTextColor: '#ffffff'
    },

    /* 3. BUBBLE POP — Playful, big rounded, warm gradient */
    bubblepop: {
      font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
      winBg: '#fffaf3', blur: false,
      headerBg: 'linear-gradient(120deg,#ff6b9d,#ffa36b)',
      border: '#ffe1ec',
      text: '#3a2a3a', textSub: '#b98aa0',
      botBubble: '#fff0f6', botBorder: '#ffe1ec', botText: '#5a3a4a',
      userBubble: 'linear-gradient(135deg,#ff6b9d,#ffa36b)', userText: '#ffffff',
      fabBg: 'linear-gradient(135deg,#ff6b9d,#ffa36b)', fabShape: '50%', fabIcon: '#ffffff', fabBorder: 'none',
      winRadius: '28px', bubbleRadius: '22px', inputBg: '#fff5f8', inputBorder: '#ffd9e6',
      sendBg: 'linear-gradient(135deg,#ff6b9d,#ffa36b)', sendIcon: '#ffffff',
      shadow: '0 14px 40px rgba(255,107,157,0.35)', dot: '#ffffff', anim: 'bounce',
      headerTextColor: '#ffffff'
    },

    /* 4. NEON EDGE — Dark cyberpunk with glowing teal */
    neon: {
      font: "'Courier New',monospace",
      winBg: '#0a0e16', blur: false,
      headerBg: '#0d1420',
      border: '#00ffc8',
      text: '#e6fffa', textSub: '#5fe8cf',
      botBubble: 'rgba(0,255,200,0.07)', botBorder: 'rgba(0,255,200,0.25)', botText: '#bff5ea',
      userBubble: 'rgba(0,255,200,0.18)', userText: '#ffffff',
      fabBg: '#0a0e16', fabShape: '50%', fabIcon: '#00ffc8', fabBorder: '1.5px solid #00ffc8',
      winRadius: '12px', bubbleRadius: '6px', inputBg: 'rgba(0,255,200,0.05)', inputBorder: 'rgba(0,255,200,0.3)',
      sendBg: 'rgba(0,255,200,0.15)', sendIcon: '#00ffc8',
      shadow: '0 0 30px rgba(0,255,200,0.25)', dot: '#00ffc8', anim: 'neonpulse',
      headerTextColor: '#00ffc8'
    },

    /* 5. SOFT CARD — Neumorphism, pastel, soft shadows */
    softcard: {
      font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
      winBg: '#eef1f6', blur: false,
      headerBg: '#eef1f6',
      border: 'transparent',
      text: '#3a4256', textSub: '#9099b0',
      botBubble: '#ffffff', botBorder: 'transparent', botText: '#3a4256',
      userBubble: '#7c8db5', userText: '#ffffff',
      fabBg: '#eef1f6', fabShape: '50%', fabIcon: '#7c8db5', fabBorder: 'none',
      winRadius: '26px', bubbleRadius: '16px', inputBg: '#ffffff', inputBorder: 'transparent',
      sendBg: '#7c8db5', sendIcon: '#ffffff',
      shadow: '10px 10px 24px rgba(166,180,205,0.45), -10px -10px 24px rgba(255,255,255,0.85)',
      fabShadow: '6px 6px 14px rgba(166,180,205,0.5), -6px -6px 14px rgba(255,255,255,0.9)',
      dot: '#7c8db5', anim: 'fade', headerTextColor: '#3a4256'
    },

    /* 6. EXECUTIVE — Corporate navy, structured, professional */
    executive: {
      font: "'Segoe UI',Arial,sans-serif",
      winBg: '#ffffff', blur: false,
      headerBg: '#16243d',
      border: '#dde2ea',
      text: '#16243d', textSub: '#7c8aa0',
      botBubble: '#f3f5f8', botBorder: '#e8ebf0', botText: '#16243d',
      userBubble: '#16243d', userText: '#ffffff',
      fabBg: '#16243d', fabShape: '14px', fabIcon: '#ffffff', fabBorder: 'none',
      winRadius: '10px', bubbleRadius: '8px', inputBg: '#f7f8fa', inputBorder: '#dde2ea',
      sendBg: '#16243d', sendIcon: '#ffffff',
      shadow: '0 16px 48px rgba(22,36,61,0.18)', dot: '#7fd1a8', anim: 'pulse',
      headerTextColor: '#ffffff'
    }
  };

  var P = PRESETS[theme] || PRESETS.aurora;
  var SIDE = (position === 'left') ? 'left' : 'right';
  var UID = 'soltai-' + Math.random().toString(36).slice(2, 8);

  /* ---------- Build animation CSS based on preset ---------- */
  var animCSS = '';
  var fabAnimName = UID + '-anim';
  if (P.anim === 'pulse') {
    animCSS = `@keyframes ${fabAnimName}{0%{box-shadow:0 0 0 0 rgba(255,255,255,0.0),${P.shadow};}70%{box-shadow:0 0 0 14px rgba(255,255,255,0.0),${P.shadow};}100%{box-shadow:0 0 0 0 rgba(255,255,255,0.0),${P.shadow};}}`;
  } else if (P.anim === 'bounce') {
    animCSS = `@keyframes ${fabAnimName}{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.04);}}`;
  } else if (P.anim === 'neonpulse') {
    animCSS = `@keyframes ${fabAnimName}{0%,100%{box-shadow:0 0 14px rgba(0,255,200,0.35);}50%{box-shadow:0 0 28px rgba(0,255,200,0.7);}}`;
  } else {
    animCSS = `@keyframes ${fabAnimName}{0%,100%{opacity:1;}50%{opacity:0.85;}}`;
  }

  var fabShadow = P.fabShadow || P.shadow;
  var fabBorderCSS = (P.fabBorder && P.fabBorder !== 'none') ? P.fabBorder : 'none';
  var winBackdrop = P.blur ? 'backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);' : '';

  /* ---------- Inject styles ---------- */
  var style = document.createElement('style');
  style.id = UID + '-style';
  style.textContent = `
  ${animCSS}
  @keyframes ${UID}-blink{0%,100%{opacity:.35;}50%{opacity:1;}}
  @keyframes ${UID}-slideup{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}

  #${UID}-fab{position:fixed;bottom:24px;${SIDE}:24px;z-index:999998;width:58px;height:58px;
    border-radius:${P.fabShape};background:${P.fabBg};border:${fabBorderCSS};
    box-shadow:${fabShadow};cursor:pointer;display:flex;align-items:center;justify-content:center;
    animation:${fabAnimName} 2.6s ease-in-out infinite;transition:transform .2s;font-family:${P.font};}
  #${UID}-fab:hover{transform:scale(1.06);}

  #${UID}-win{position:fixed;bottom:92px;${SIDE}:24px;z-index:999999;width:354px;max-height:530px;
    background:${P.winBg};${winBackdrop}border:1px solid ${P.border};border-radius:${P.winRadius};overflow:hidden;
    box-shadow:${P.shadow};display:none;flex-direction:column;font-family:${P.font};}
  #${UID}-win.open{display:flex;animation:${UID}-slideup .25s ease;}

  #${UID}-head{background:${P.headerBg};border-bottom:1px solid ${P.border};padding:14px 16px;
    display:flex;align-items:center;justify-content:space-between;}
  #${UID}-head-info{display:flex;align-items:center;gap:10px;}
  #${UID}-avatar{width:32px;height:32px;border-radius:${P.fabShape==='50%'?'50%':'10px'};background:${P.winBg};
    border:1.5px solid ${P.headerTextColor||P.text};display:flex;align-items:center;justify-content:center;
    font-weight:700;font-size:14px;color:${P.headerTextColor||P.text};flex-shrink:0;}
  #${UID}-name{font-size:13px;font-weight:600;color:${P.headerTextColor||P.text};}
  #${UID}-status{display:flex;align-items:center;gap:5px;margin-top:2px;}
  #${UID}-dot{width:6px;height:6px;border-radius:50%;background:${P.dot};animation:${UID}-blink 2s infinite;}
  #${UID}-statustext{font-size:11px;color:${P.headerTextColor||P.textSub};opacity:0.85;}
  #${UID}-close{background:none;border:none;cursor:pointer;padding:4px;color:${P.headerTextColor||P.textSub};}

  #${UID}-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;min-height:220px;max-height:340px;}
  #${UID}-msgs::-webkit-scrollbar{width:3px;}
  #${UID}-msgs::-webkit-scrollbar-thumb{background:${P.border};border-radius:2px;}

  .${UID}-msg{max-width:85%;padding:10px 14px;border-radius:${P.bubbleRadius};font-size:13px;line-height:1.5;
    white-space:pre-wrap;word-wrap:break-word;}
  .${UID}-bot{background:${P.botBubble};border:1px solid ${P.botBorder};color:${P.botText};align-self:flex-start;
    border-radius:4px ${P.bubbleRadius} ${P.bubbleRadius} ${P.bubbleRadius};}
  .${UID}-user{background:${P.userBubble};color:${P.userText};align-self:flex-end;
    border-radius:${P.bubbleRadius} 4px ${P.bubbleRadius} ${P.bubbleRadius};}

  #${UID}-inputarea{border-top:1px solid ${P.border};padding:10px;display:flex;gap:8px;align-items:flex-end;}
  #${UID}-input{flex:1;background:${P.inputBg};border:1px solid ${P.inputBorder};border-radius:${parseInt(P.bubbleRadius)>10?'12px':'6px'};
    color:${P.text};font-size:13px;padding:10px 12px;resize:none;outline:none;max-height:70px;font-family:${P.font};}
  #${UID}-input::placeholder{color:${P.textSub};opacity:0.7;}
  #${UID}-send{width:36px;height:36px;border-radius:${parseInt(P.bubbleRadius)>10?'10px':'6px'};flex-shrink:0;
    background:${P.sendBg};border:none;color:${P.sendIcon};cursor:pointer;display:flex;align-items:center;justify-content:center;}

  .${UID}-typing{display:flex;gap:4px;padding:10px 14px;}
  .${UID}-typing span{width:5px;height:5px;border-radius:50%;background:${P.dot==='#ffffff'?P.textSub:P.dot};animation:${UID}-blink 1.2s infinite;}
  .${UID}-typing span:nth-child(2){animation-delay:.2s;}
  .${UID}-typing span:nth-child(3){animation-delay:.4s;}

  @media(max-width:480px){
    #${UID}-win{width:92vw;${SIDE}:4vw;bottom:86px;max-height:70vh;}
    #${UID}-fab{bottom:16px;${SIDE}:16px;}
  }
  `;
  document.head.appendChild(style);

  /* ---------- Helpers ---------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Build DOM ---------- */
  var fab = document.createElement('button');
  fab.id = UID + '-fab';
  fab.innerHTML = `
    <svg id="${UID}-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${P.fabIcon}" stroke-width="1.7">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
    <svg id="${UID}-icon-x" style="display:none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${P.fabIcon}" stroke-width="1.7">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>`;

  var win = document.createElement('div');
  win.id = UID + '-win';
  win.innerHTML = `
    <div id="${UID}-head">
      <div id="${UID}-head-info">
        <div id="${UID}-avatar">${(botName || 'A').charAt(0).toUpperCase()}</div>
        <div>
          <div id="${UID}-name">${escapeHtml(botName)}</div>
          <div id="${UID}-status"><div id="${UID}-dot"></div><span id="${UID}-statustext">Online</span></div>
        </div>
      </div>
      <button id="${UID}-close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div id="${UID}-msgs"></div>
    <div id="${UID}-inputarea">
      <textarea id="${UID}-input" rows="1" placeholder="Type your message..."></textarea>
      <button id="${UID}-send">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(win);

  /* ---------- Message helpers ---------- */
  function addMsg(text, who) {
    var msgs = document.getElementById(UID + '-msgs');
    var el = document.createElement('div');
    el.className = UID + '-msg ' + (who === 'user' ? UID + '-user' : UID + '-bot');
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }
  function addTyping() {
    var msgs = document.getElementById(UID + '-msgs');
    var el = document.createElement('div');
    el.className = UID + '-msg ' + UID + '-bot ' + UID + '-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  addMsg(welcome, 'bot');

  /* ---------- Toggle ---------- */
  var isOpen = false;
  function toggleWin() {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    document.getElementById(UID + '-icon-chat').style.display = isOpen ? 'none' : 'block';
    document.getElementById(UID + '-icon-x').style.display = isOpen ? 'block' : 'none';
    if (isOpen) setTimeout(function () { document.getElementById(UID + '-input').focus(); }, 100);
  }
  fab.addEventListener('click', toggleWin);
  document.getElementById(UID + '-close').addEventListener('click', toggleWin);

  /* ---------- Send message ---------- */
  function sendMessage() {
    var input = document.getElementById(UID + '-input');
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMsg(text, 'user');
    var typing = addTyping();

    var payload = {
      message: text,
      business_type: businessType,
      bot_name: botName,
      business_name: businessName,
      welcome_message: welcome,
      phone: config.phone || '',
      email: config.email || '',
      address: config.address || '',
      timings: config.timings || '',
      days: config.days || '',
      services: config.services || '',
      pricing: config.pricing || '',
      team: config.team || '',
      instructions: config.instructions || '',
      faqs: config.faqs || ''
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        typing.remove();
        addMsg(data.reply || 'Sorry, something went wrong. Please try again.', 'bot');
      })
      .catch(function () {
        typing.remove();
        addMsg('Connection error. Please try again in a moment.', 'bot');
      });
  }

  document.getElementById(UID + '-send').addEventListener('click', sendMessage);
  document.getElementById(UID + '-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

})();
