// client.js
import { createChatLi, generateResponse, setElementColor } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("user-message");
    const initialMessage = "Hi there! How can I assist you today?"; // Initial message

    // Set colors dynamically
    setElementColor('.chatbot header', 'purple', 'white');
    setElementColor('.chatbot-toggler', 'purple', 'white');
    // setElementColor('.chatbox .chat p.error', 'gray', 'black');
    setElementColor('.chatbox .chat p', '#f1f1f1', 'black');
    setElementColor('.chatbox', 'white', 'black');
    setElementColor('.chatbot .chat-input', 'black', 'white');
    setElementColor('.chatbot textarea', 'white', 'black');
    setElementColor('.chat-input span', '', 'white');

    // Set prompt and first message
    document.querySelector(".chatbox li:first-child p").innerHTML = initialMessage;

    const handleChat = () => {
        const userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea
        chatInput.value = "";

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
    }

    document.getElementById("send-btn").addEventListener("click", handleChat);
    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window 
        // width is greater than 800px, handle the chat
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");

    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});
