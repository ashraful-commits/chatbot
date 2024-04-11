import { generateChatGPTResponse, createChatLi } from './main.js';

// Define your variables and constants
const urlParams = new URLSearchParams(window.location.search);
const color = urlParams.get('color') || 'white';
const bgColor = urlParams.get('bgColor') || 'purple';
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;
// Set element colors
const setElementColor = (elementSelector, backgroundColor, color) => {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.style.backgroundColor = backgroundColor;
        element.style.color = color;
    } else {
        console.error(`Element with selector '${elementSelector}' not found.`);
    }
};

// Function to handle chat
const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollIntoView({ behavior: "smooth", block: "end" });
        const chatGPTPrompt = "CHATGPT Prompt: " + userMessage; // Construct the ChatGPT prompt
        generateChatGPTResponse(incomingChatLi, userMessage, chatGPTPrompt); // Pass the ChatGPT prompt
    }, 600);
};

// Event listeners
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
