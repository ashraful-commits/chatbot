import { generateResponse, createChatLi, setElementColor,fetchClientConfig } from './main.js';

document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    let userMessage = null; // Variable to store user's message
    const urlParams = new URLSearchParams(window.location.search);
    
    const clientId = urlParams.get('client') ||'client1';
    const token = urlParams.get('token')
    const config =fetchClientConfig(clientId) 
    setElementColor('.chatbot header', config.bgColor, config.color);
  
    // Append the first message to the chatbox
    chatbox.innerHTML = ""; // Clear previous content
    chatbox.appendChild(createChatLi(config.message, "incoming"));

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea
        chatInput.value = "";

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
         if(clientId ===urlParams.get('client')){
            setTimeout(() => {
                // Display "Thinking..." message while waiting for the response
                const incomingChatLi = createChatLi("Thinking...", "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                if(token==config.token){
                    generateResponse(incomingChatLi, userMessage,config.prompt,config.token);
                }
            }, 600);
         }
       
    };

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
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
