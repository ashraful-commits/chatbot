import { createChatLi, generateResponse ,setElementColor} from './main.js';

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; 
let chatGptPrompt = "You are a sales consultant on a shoe sales site, your job is to answer customer questions and help them buy"; 
let firstMessage = "Hi there 👋<br>How can I help you today?"; // Initial message

const inputInitHeight = chatInput.scrollHeight;

setElementColor(".chatbot header", 'purple','white')
setElementColor(".chatbot-toggler", 'purple','white')

// Function to add the first message dynamically
const addFirstMessage = () => {
  const firstMessageLi = createChatLi(firstMessage, "incoming");
  chatbox.appendChild(firstMessageLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
}

// Call the function to add the first message when the DOM content is loaded
document.addEventListener("DOMContentLoaded", addFirstMessage);

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if(!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi,userMessage,chatGptPrompt);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
