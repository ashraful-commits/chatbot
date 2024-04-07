// main.js
const chatbox = document.querySelector(".chatbox");

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const API_KEY = urlParams.get('apiKey');
const bgColor = urlParams.get('bgColor') || 'purple';
const fontColor = urlParams.get('fontColor') || 'white';
const initialMessage = urlParams.get('initialMessage') || 'Hi there! How can I assist you today?';

// Function to create chat messages
export const createChatLi = (message, className,bgColor,color,iconBgColor,iconColor) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" ? `<p style="background-color: ${bgColor}; color:${color};">${message}</p>` : `<span style="background-color: ${iconBgColor};color:${iconColor}" class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Function to generate chatbot response
export const generateResponse = (chatElement, userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` // Use client's API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    };

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

// Function to set element colors
export const setElementColor = (elementSelector, backgroundColor, color) => {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.style.backgroundColor = backgroundColor;
        element.style.color = color;
    } else {
        console.error(`Element with selector '${elementSelector}' not found.`);
    }
}

// Initialize chatbot with customizations
setElementColor('.chatbot header', bgColor, fontColor);
document.querySelector(".chatbox li:first-child p").innerHTML = initialMessage;
