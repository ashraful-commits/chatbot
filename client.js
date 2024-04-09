// client.js
import { createChatLi, generateResponse, setElementColor } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("user-message");
   

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const initialMessage = urlParams.get('initialMessage') || 'Hi there! How can I assist you today?';
    const chatHeaderBgColor = urlParams.get('chatHeaderBgColor') || 'purple';
    const chatHeaderFontColor = urlParams.get('chatHeaderFontColor') || 'white';
    const chatTogglerBgColor = urlParams.get('chatTogglerBgColor') || 'purple';
    const chatTogglerFontColor = urlParams.get('chatTogglerFontColor') || 'white';
    const chatMessageBgColor = urlParams.get('chatMessageBgColor') || '#f1f1f1';
    const chatMessageFontColor = urlParams.get('chatMessageFontColor') || 'black';
    const chatBoxBgColor = urlParams.get('chatBoxBgColor') || 'white';
    const chatBoxFontColor = urlParams.get('chatBoxFontColor') || 'black';
    const chatInputBgColor = urlParams.get('chatInputBgColor') || 'purple';
    const chatInputFontColor = urlParams.get('chatInputFontColor') || 'white';
    const sendBtnFontColor = urlParams.get('sendBtnFontColor') || 'white';
    const incomingListBgColor = urlParams.get('incomingListBgColor') || 'purple';
    const incomingListFontColor = urlParams.get('incomingListFontColor') || 'white';
    const incomingListErrorBgColor = urlParams.get('incomingListBgColor') || 'purple';
    const incomingListErrorFontColor = urlParams.get('incomingListFontColor') || 'white';
    const outgoingListBgColor = urlParams.get('outgoingListBgColor') || 'purple';
    
    const outgoingListFontColor = urlParams.get('outgoingListFontColor') || 'white';
    const iconBgColor = urlParams.get('iconBgColor') || 'purple';
    const iconColor = urlParams.get('iconColor') || 'white';
    const bodyWidth = urlParams.get('bodyWidth') || '50px';
    const bodyHeight = urlParams.get('bodyHeight') || '50px';

    // Set colors dynamically
    setElementColor('.chatbot header', chatHeaderBgColor, chatHeaderFontColor);
    setElementColor('.chatbot-toggler', chatTogglerBgColor, chatTogglerFontColor);
    setElementColor('.chatbox .chat p', chatMessageBgColor, chatMessageFontColor); // Change background and font color of chat messages
    setElementColor('.chatbox li:first-child p', incomingListErrorBgColor, incomingListErrorFontColor); // Change background and font color of chat messages
    setElementColor('.chatbox li:first-child .material-symbols-outlined', iconBgColor, iconColor); // Change background and font color of chat messages
    setElementColor('.chatbox .chat .error', incomingListErrorBgColor, incomingListErrorFontColor); // Change background and font color of chat messages
    setElementColor('.chatbox', chatBoxBgColor, chatBoxFontColor); // Change background color of the chatbox
    setElementColor('.chatbot .chat-input', chatInputBgColor, chatInputFontColor); // Change font color and background color of chat input area
    setElementColor('.chatbot textarea', chatBoxBgColor, chatBoxFontColor); // Change background color of textarea
    setElementColor('.chat-input span', '', sendBtnFontColor); // Change font color of send button
    

    // Set prompt and first message
    document.querySelector(".chatbox li:first-child p").innerHTML = initialMessage;

    const handleChat = () => {
        const userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if (!userMessage) return;

        // Clear the input textarea
        chatInput.value = "";

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing",outgoingListBgColor,outgoingListFontColor,iconBgColor,
        iconColor));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming",incomingListBgColor,incomingListBgColor,iconBgColor
            ,iconColor);
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
    
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-chatbot");
        document.body.style.width = bodyWidth;
        document.body.style.height = bodyHeight;
        document.body.style.overflow = "hidden";
        document.body.style.borderRadius = "hidden";
    });
    
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
        document.body.style.width = "50px";
        document.body.style.height = "50px";
        document.body.style.overflow = "hidden";
        document.body.style.borderRadius = "hidden";
    });
    
});
