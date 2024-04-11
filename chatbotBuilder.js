// chatbotBuilder.js

function generateEmbedCode(prompt, bgColor, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/chatbot.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color); // Changed variable name to encodedColor
  const encodedBgColor = encodeURIComponent(bgColor); // Changed variable name to encodedBgColor
  const encodedFirstMessage = encodeURIComponent(firstMessage);
  const embedCode = `
  <iframe id="iframe" src="${chatbotUrl}?prompt=${prompt}&bgColor=${encodedBgColor}&color=${encodedColor}&message=${encodedFirstMessage}" 
  width="300px" height="500px" frameborder="0" style="pointer-events: auto; position: fixed; bottom: 0; right: 0; height:750px; width:100%; z-index:999999"></iframe>
  <button id="button" style="position: fixed; bottom: 50px; right: 50px; border-radius: 100%; padding: 10px; width: 50px; height: 50px; border: none; background: purple; color: white; display: flex; justify-content: center;align-items: center; z-index: 999999;" onclick="toggleIframe()">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
</button>

<script>
  var iframe = document.getElementById('iframe');
  iframe.style.display="none";
  function toggleIframe() {
    var button = document.getElementById('button');
    if (iframe.style.display === 'none' || !iframe.style.display) {
      iframe.style.display = 'block'; 
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>';
    } else {
      iframe.style.display = 'none';
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    }
  }
</script>
`;


  return embedCode;
}

function onSubmitForm() {
  // Add your form submission logic here
  const prompt = document.getElementById('prompt').value;
  const bgColor = document.getElementById('bgColor').value;
  const color = document.getElementById('color').value;
  const firstMessage = document.getElementById('firstMessage').value;
  // Generate embed code or perform other actions
  const embedCode = generateEmbedCode(prompt, bgColor, color, firstMessage);
  document.getElementById('embedCode').value = embedCode;
}


function copyEmbedCode() {
  const textarea = document.getElementById('embedCode');
  textarea.select();
  document.execCommand('copy');
  alert('Embed code copied to clipboard!');
}