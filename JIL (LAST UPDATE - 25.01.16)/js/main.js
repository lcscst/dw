// Lista de usuários e senhas
const users = [
    { username: "admin", password: "12345" },
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
  ];
  
  // Lógica de login
  document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
  
    // Verifica se o usuário e senha existem na lista
    const userFound = users.find(user => user.username === username && user.password === password);
  
    if (userFound) {
      window.location.href = "jil.html"; // Redireciona para a nova página
    } else {
      messageDiv.innerHTML = `<span style="color: red;">Usuário ou senha incorretos. Tente novamente.</span>`;
    }
  });
  