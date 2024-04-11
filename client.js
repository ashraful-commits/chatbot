import { generateResponse, createChatLi, setElementColor } from './main.js';

document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    let userMessage = null; // Variable to store user's message
    // const inputInitHeight = chatInput.scrollHeight;
    const urlParams = new URLSearchParams(window.location.search);
    const bgColor = urlParams.get('bgColor') || 'purple';
    const color = urlParams.get('color') || 'purple';
    const firstMessage = urlParams.get('message') || 'Hi there 👋<br>How can I help you today?';
    const prompt = urlParams.get('prompt');
    setElementColor('.chatbot header', bgColor, color);
    setElementColor('show-chatbot .chatbox .incoming span', bgColor, color);
    setElementColor('show-chatbot .chatbox .chat p', bgColor, color);
    setElementColor('show-chatbot .chatbox .incoming p', bgColor, color);
    setElementColor('show-chatbot .chatbox .outgoing p', bgColor, color);
    setElementColor('show-chatbot .chatbox .chat p', bgColor, color);

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        // chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, userMessage);
        }, 600);
    };

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
});
