// chatbotBuilder.js

function generateEmbedCode(prompt, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/index.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color); // Changed variable name to encodedColor
  const encodedBgColor = encodeURIComponent(bgColor); // Changed variable name to encodedBgColor
  const encodedFirstMessage = encodeURIComponent(firstMessage);

  const embedCode = `
  <iframe src="https://chatbot-ruby-five.vercel.app/index.html?prompt=asdfdf&bgColor=%5Bobject%20HTMLInputElement%5D&color=%23d51a1a&message=%231e29c2" 
  width="300px" height="500px" frameborder="0" style="pointer-events: auto; position: fixed; bottom: 0; right: 0; height:750px; width:100%"></iframe>
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


