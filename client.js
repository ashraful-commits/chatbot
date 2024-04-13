document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");
    let userMessage = null; // Variable to store user's message
    
    // if (!closeBtn || !chatbox || !chatInput || !sendChatBtn) {
    //     console.error('One or more elements not found.');
    //     return;
    // }

    const bgColor = '#724ae8'; // Default background color
    const color = 'white'; // Default text color
    const firstMessage = 'Hi there 👋<br>How can I help you today?';
    
    // Clear previous content inside chatbox
    chatbox.innerHTML = ""; 

    // Append the first message to the chatbox
    chatbox.appendChild(createChatLi(firstMessage, "incoming"));

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
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
