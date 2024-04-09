import { createChatLi, generateResponse, setElementColor } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document?.getElementById("usermessage");
    const chatbox = document.querySelector(".chatbox"); // Declare chatbox variable
    console.log(chatInput)
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
    const incomingListErrorBgColor = urlParams.get('incomingListErrorBgColor') || 'purple'; // Fixed typo
    const incomingListErrorFontColor = urlParams.get('incomingListErrorFontColor') || 'white'; // Fixed typo
    const outgoingListBgColor = urlParams.get('outgoingListBgColor') || 'purple';
    const outgoingListFontColor = urlParams.get('outgoingListFontColor') || 'white';
    const iconBgColor = urlParams.get('iconBgColor') || 'purple';
    const iconColor = urlParams.get('iconColor') || 'white';
    const bodyWidth = urlParams.get('bodyWidth') || '50px';
    const bodyHeight = urlParams.get('bodyHeight') || '50px';

    // Set colors dynamically
    setElementColor('.chatbot header', chatHeaderBgColor, chatHeaderFontColor);
    setElementColor('.chatbot-toggler', chatTogglerBgColor, chatTogglerFontColor);
    setElementColor('.chatbox .chat p', chatMessageBgColor, chatMessageFontColor);
    setElementColor('.chatbox li:first-child p', incomingListErrorBgColor, incomingListErrorFontColor);
    setElementColor('.chatbox li:first-child .material-symbols-outlined', iconBgColor, iconColor);
    setElementColor('.chatbox .chat .error', incomingListErrorBgColor, incomingListErrorFontColor);
    setElementColor('.chatbox', chatBoxBgColor, chatBoxFontColor);
    setElementColor('.chatbot .chat-input', chatInputBgColor, chatInputFontColor);
    setElementColor('.chatbot textarea', chatBoxBgColor, chatBoxFontColor);
    setElementColor('.chat-input span', '', sendBtnFontColor);

    // Set prompt and first message
    document.querySelector(".chatbox li:first-child p").innerHTML = initialMessage;

    const handleChat = () => {
        const userMessage = chatInput?.value.trim();
        if (!userMessage) return;

        chatInput.value = "";

        chatbox.appendChild(createChatLi(userMessage, "outgoing", outgoingListBgColor, outgoingListFontColor, iconBgColor, iconColor));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming", incomingListBgColor, incomingListFontColor, iconBgColor, iconColor);
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, userMessage);
        }, 600);
    }

    document.getElementById("send-btn").addEventListener("click", handleChat);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });


    const closeBtn = document.querySelector(".close-btn");

    // Declare closeBtn and chatbotToggler variables before using them
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-chatbot");
        document.body.style.width = "0px";
        document.body.style.height = "0px";
    });


});
