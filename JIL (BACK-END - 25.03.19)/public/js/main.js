import { getUsers } from './api.js';

document.getElementById('loginButton').addEventListener('click', async function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  try {
    const users = await getUsers();

    const userFound = users.find(user => user.username === username && user.password === password);

    if (userFound) {
      localStorage.setItem('loggedInUser', username);
      localStorage.setItem('loggedUserId', userFound.id);

      window.location.href = "jil.html";
    } else {
      messageDiv.innerHTML = `<span style="color: red;">Usuário ou senha incorretos. Tente novamente.</span>`;
    }
  } catch (error) {
    console.error('Error during login:', error);
    messageDiv.innerHTML = `<span style="color: red;">Erro ao conectar ao servidor: ${error.message}. Tente novamente mais tarde.</span>`;
  }
});