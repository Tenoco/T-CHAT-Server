// script.js

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Function to get a cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Function to handle POST requests
function handlePostRequest() {
    const postInput = document.getElementById('postInput');
    const message = postInput.value.trim();

    if (message) {
        // Save message to cookie
        const existingMessages = getCookie('messages') ? JSON.parse(getCookie('messages')) : [];
        existingMessages.push(message);
        setCookie('messages', JSON.stringify(existingMessages), 7); // Save for 7 days

        // Display response
        const postResponseDiv = document.getElementById('postResponse');
        postResponseDiv.textContent = 'Message saved successfully!';
        postInput.value = ''; // Clear input
    } else {
        alert('Please enter a message.');
    }
}

// Function to handle GET requests
function handleGetRequest() {
    const messages = getCookie('messages') ? JSON.parse(getCookie('messages')) : [];
    const getResponseDiv = document.getElementById('getResponse');
    
    if (messages.length > 0) {
        getResponseDiv.textContent = 'Messages: ' + messages.join(', ');
    } else {
        getResponseDiv.textContent = 'No messages found.';
    }
}

// Event listeners
document.getElementById('postRequest').addEventListener('click', handlePostRequest);
document.getElementById('getRequest').addEventListener('click', handleGetRequest);