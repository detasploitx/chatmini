let currentUsername = '';
const users = new Set();
const credentials = {
    'B. BAPPY': '1',
    'Shariful_D': 'shariful123',
    'AR_Rahman_D': 'rahman123'
};

// Event listeners for login and sending messages
document.getElementById('login').addEventListener('click', login);
document.getElementById('send').addEventListener('click', sendMessage);
document.getElementById('message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
    showTypingStatus();
});
document.getElementById('logout').addEventListener('click', logout);

function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (credentials[email] === password) {
        currentUsername = email.split('_D')[0]; // Set username from email
        users.add(currentUsername);
        document.getElementById('user-list').innerHTML = `<p>Connected Users: ${Array.from(users).join(', ')}</p>`;
        document.getElementById('logout').style.display = 'block';
        document.getElementById('send').style.display = 'inline-block';

        // Hide login and show chat container
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    } else {
        document.getElementById('login-error').innerText = "Invalid username or secret key.";
        document.getElementById('login-error').style.display = 'block';
    }
}

function sendMessage() {
    const message = document.getElementById('message').value.trim();

    if (!currentUsername) {
        alert("Please login before sending a message.");
        return;
    }

    if (message) {
        const date = new Date();
        const timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isMyMessage = true; // This would be based on user identity
        const messageClass = isMyMessage ? 'my-message' : 'friend-message';

        const messageHTML = `
            <div class="message ${messageClass}">
                <strong>${currentUsername} <span style="font-size: 0.8em; color: #555;">(${timestamp})</span></strong>
                ${message} <!-- Display the original message -->
            </div>
        `;
        document.getElementById('output').innerHTML += messageHTML;
        document.getElementById('message').value = ''; // Clear input field
        document.getElementById('feedback').innerHTML = '';
        scrollToBottom();
    } else {
        alert("Message cannot be empty.");
    }
}

function showTypingStatus() {
    document.getElementById('feedback').innerHTML = `${currentUsername} is typing...`;
    setTimeout(() => {
        document.getElementById('feedback').innerHTML = '';
    }, 1000); // Clear status after 1 second
}

function logout() {
    currentUsername = '';
    users.clear();
    document.getElementById('user-list').innerHTML = '';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('send').style.display = 'none';

    // Show login container and hide chat container
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('chat-container').style.display = 'none';
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Placeholder for server communication; should be replaced with actual server-side code
function connectToServer() {
    // Implement WebSocket or other secure connection methods
}

connectToServer();