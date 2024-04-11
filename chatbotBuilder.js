// chatbotBuilder.js

function generateEmbedCode(prompt, color, firstMessage) {
  const chatbotUrl = "https://chatbot-ruby-five.vercel.app/index.html";
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedColor = encodeURIComponent(color);
  const encodedFirstMessage = encodeURIComponent(firstMessage);

  const embedCode = `
      <iframe src="${chatbotUrl}?prompt=${encodedPrompt}&color=${encodedColor}&message=${encodedFirstMessage}" 
          width="100%" height="300px" frameborder="0"></iframe>
  `;
  
  return embedCode;
}

function onSubmitForm() {
  const prompt = document.getElementById('prompt').value;
  const color = document.getElementById('color').value;
  const firstMessage = document.getElementById('firstMessage').value;

  const embedCode = generateEmbedCode(prompt, color, firstMessage);
  document.getElementById('embedCode').value = embedCode;
}
