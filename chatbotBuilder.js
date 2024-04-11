// chatbotBuilder.js

function generateEmbedCode(prompt, bgColor, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/chatbot.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color);
  const encodedBgColor = encodeURIComponent(bgColor);
  const encodedFirstMessage = encodeURIComponent(firstMessage);
  
  const embedCode = `
    <iframe id="iframe" src="${chatbotUrl}?prompt=${encodedPrompt}&bgColor=${encodedBgColor}&color=${encodedColor}&message=${encodedFirstMessage}" style="pointer-events: auto; position: fixed; bottom: 0; right: 0; height:950px; width:660px; z-index:999999; border:none;padding:100px 50px;"></iframe>
    
    <button id="button" style="position: fixed; bottom: 50px; right: 50px; border-radius: 100%; padding: 10px; width: 50px; height: 50px; border: none; background: ${bgColor}; color: ${color}; display: flex; justify-content: center; align-items: center; z-index: 999999;" onclick="toggleIframe()">
    <svg xmlns="http://www.w3.org/2000/svg" id="toggleIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path id="showIcon" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </button>
  
  <script>
    var iframe = document.getElementById('iframe');
    iframe.style.display = "none";
  
    function toggleIframe() {
      var button = document.getElementById('button');
      var showIcon = document.getElementById('showIcon');
      var display = (iframe.style.display === 'none' || !iframe.style.display) ? 'block' : 'none';
      
      iframe.style.display = display;
  
      if (display === 'none') {
        showIcon.setAttribute('d', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z');
      } else {
        showIcon.setAttribute('d', 'M18 6 L6 18 M6 6 L18 18');
      }
    }
  </script>
  `;

  return embedCode;
}

function onSubmitForm() {
  const prompt = document.getElementById('prompt').value;
  const bgColor = document.getElementById('bgColor').value;
  const color = document.getElementById('color').value;
  const firstMessage = document.getElementById('firstMessage').value;
  
  const embedCode = generateEmbedCode(prompt, bgColor, color, firstMessage);
  document.getElementById('embedCode').value = embedCode;
}

function copyEmbedCode() {
  const textarea = document.getElementById('embedCode');
  textarea.select();
  document.execCommand('copy');
  alert('Embed code copied to clipboard!');
}
