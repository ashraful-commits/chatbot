// chatbotBuilder.js

function generateEmbedCode(prompt, bgColor, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/chatbot.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color); // Changed variable name to encodedColor
  const encodedBgColor = encodeURIComponent(bgColor); // Changed variable name to encodedBgColor
  const encodedFirstMessage = encodeURIComponent(firstMessage);

  const embedCode = `
  <iframe src="${chatbotUrl}?prompt=${prompt}&bgColor=${encodedBgColor}&color=${encodedColor}&message=${encodedFirstMessage}" 
  width="300px" height="500px" frameborder="0" style="pointer-events: auto; position: fixed; bottom: 0; right: 0; height:750px; width:100%; z-index:999999"></iframe>
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