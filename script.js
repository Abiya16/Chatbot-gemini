document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

const API_KEY = "AIzaSyDh_l8bpH6kyM1vSJyGim7Um_8CwLWVs_4";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Append user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("chat", "user");
    userMessage.innerHTML = `<div class="message">${userInput}</div>`;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    fetchBotResponse(userInput);
}

function fetchBotResponse(userMessage) {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }]
        })
    })
    .then(response => response.json())
    .then(data => {
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

        let botMessage = document.createElement("div");
        botMessage.classList.add("chat", "bot");
        botMessage.innerHTML = `<div class="icon"><i class="fas fa-robot"></i></div><div class="message">${botReply}</div>`;
        document.getElementById("chat-box").appendChild(botMessage);
        document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        let botMessage = document.createElement("div");
        botMessage.classList.add("chat", "bot");
        botMessage.innerHTML = `<div class="icon"><i class="fas fa-robot"></i></div><div class="message">Sorry, there was an error. Try again later.</div>`;
        document.getElementById("chat-box").appendChild(botMessage);
        document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
    });
}
