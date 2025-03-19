import { currentUser } from "./api.js";

const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
        messageDiv.innerHTML = `<span style="color: red;">${data.message}</span>`;
    }
    
    if (response.ok) {
        localStorage.setItem("jiltoken", data.token);

        const isLogged = await currentUser();

        localStorage.setItem("loggedUserId", isLogged.id);
        localStorage.setItem("loggedInUser", isLogged.username);
        
        window.location.href = "jil.html";
    }
});
