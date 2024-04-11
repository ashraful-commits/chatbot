
// Define your variables and constants
const API_KEY = "YOUR_API_KEY"; // Replace with your OpenAI API key

// Function to generate a response using ChatGPT
export const generateChatGPTResponse = (chatElement, userMessage, chatGPTPrompt) => {
    const API_URL = "https://api.openai.com/v1/completions";

    // Get the message element where the response will be displayed
    const messageElement = chatElement.querySelector("p");

    // Define the properties for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-002",
            prompt: chatGPTPrompt, // Use the ChatGPT prompt
            max_tokens: 150,
            temperature: 0.7,
            stop: "\n"
        })
    };

    // Send the POST request to the OpenAI API
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Extract the response message from the API response
            const responseMessage = data.choices[0].text.trim();

            // Set the response message as the text content of the message element
            messageElement.textContent = responseMessage;

            // Scroll the chatbox to the bottom
            chatElement.scrollIntoView({ behavior: "smooth", block: "end" });
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
            // Display an error message in the chat
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        });
};

// Define and export the createChatLi function
export const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};


// Function to set element colors
export const setElementColor = (elementSelector, backgroundColor, color) => {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.style.backgroundColor = backgroundColor;
        element.style.color = color;
    } else {
        console.error(`Element with selector '${elementSelector}' not found.`);
    }
};
