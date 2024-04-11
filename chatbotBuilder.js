// chatbotBuilder.js

function generateEmbedCode(prompt, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/index.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color); // Changed variable name to encodedColor
  const encodedBgColor = encodeURIComponent(bgColor); // Changed variable name to encodedBgColor
  const encodedFirstMessage = encodeURIComponent(firstMessage);

  const embedCode = `
  <iframe src="${chatbotUrl}?prompt=${encodedPrompt}&bgColor=${encodedBgColor}&color=${encodedColor}&message=${encodedFirstMessage}" 
  width="100%" height="950px" frameborder="0" style="position: fixed; bottom: 10px; right: 10px;"></iframe>
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


