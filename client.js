import { generateChatGPTResponse, createChatLi, setElementColor } from './main.js';

document.addEventListener("DOMContentLoaded", function() {
    // Function to create the chatbot UI
    const createChatbotUI = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const bgColor = urlParams.get('bgColor') || 'purple';
        const color = urlParams.get('color') || 'purple';
        const firstMessage = urlParams.get('message') || 'Hi there 👋<br>How can I help you today?';
        const prompt = urlParams.get('prompt');
        
        // Create elements
        const chatbotToggler = document.createElement("button");
        chatbotToggler.classList.add("chatbot-toggler");
        chatbotToggler.innerHTML = `<span class="material-symbols-rounded">mode_comment</span>
                                    <span class="material-symbols-outlined">close</span>`;
        
        const chatbot = document.createElement("div");
        chatbot.classList.add("chatbot");
        chatbot.innerHTML = `<header>
                                <h2>Chatbot</h2>
                                <span class="close-btn material-symbols-outlined">close</span>
                            </header>
                            <ul class="chatbox">
                                <li class="chat incoming">
                                    <span class="material-symbols-outlined">smart_toy</span>
                                    <p>${firstMessage}</p>
                                </li>
                            </ul>
                            <div class="chat-input">
                                <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
                                <span id="send-btn" class="material-symbols-rounded">send</span>
                            </div>`;
        
        // Append elements to the body
        document.body.appendChild(chatbotToggler);
        document.body.appendChild(chatbot);
        
        setElementColor(".chatbot header", bgColor, color); // Example colors
        setElementColor(".chatbot-toggler", bgColor, color); // Example colors
        
        // Add event listeners
        chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
        const closeBtn = chatbot.querySelector(".close-btn");
        closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

        // Add chat functionality
        const chatInput = chatbot.querySelector(".chat-input textarea");
        const sendChatBtn = chatbot.querySelector(".chat-input span");
        const inputInitHeight = chatInput.scrollHeight;

        // Function to handle chat
        const handleChat = () => {
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            chatInput.value = "";
            chatInput.style.height = `${inputInitHeight}px`;

            const chatbox = chatbot.querySelector(".chatbox");
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
    };

    // Create the chatbot UI when the DOM content is loaded
    createChatbotUI();
});
