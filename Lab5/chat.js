const chatBox = document.getElementById("chat");
const user1Input = document.getElementById("user-1-input");
const user1SendButton = document.getElementById("user-1-send");
const user2Input = document.getElementById("user-2-input");
const user2SendButton = document.getElementById("user-2-send");

user1SendButton.addEventListener("click", () => sendMessage(user1Input, "user1"));
user1Input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(user1Input, "user1");
    }
});

user2SendButton.addEventListener("click", () => sendMessage(user2Input, "user2"));
user2Input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(user2Input, "user2");
    }
});

function sendMessage(inputField, user) {
    const message = inputField.value.trim();
    if (message !== "") {
        const messageDiv = document.createElement("div");
        messageDiv.className = "chat-message " + user;
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        inputField.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
