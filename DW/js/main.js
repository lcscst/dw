// Lista de usuários e senhas
const users = [
    { username: "admin", password: "12345" },
    { username: "teste", password: "teste" },
    { username: "root", password: "toor" }
  ];
  
  // Lógica de login
  document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
  
    // Verifica se o usuário e senha existem na lista
    const userFound = users.find(user => user.username === username && user.password === password);
  
    if (userFound) {
      localStorage.setItem('loggedInUser', username); // Armazena o nome do usuário logado
      window.location.href = "jil.html"; // Redireciona para a nova página
    } else {
      messageDiv.innerHTML = `<span style="color: red;">Usuário ou senha incorretos. Tente novamente.</span>`;
    }
  });

// Adicionar máquinas à lista
const machineForm = document.getElementById('deviceForm');
const machineList = document.getElementById('machineList');
const machineSelect = document.getElementById('machineSelect'); // Novo elemento select
const pingMachineSelect = document.getElementById('pingMachineSelect'); // Novo elemento select de ping

machineForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const machineName = machineForm.querySelector('input[placeholder="Nome do Dispositivo"]').value;
  const machineIP = machineForm.querySelector('input[placeholder="IP do Dispositivo"]').value;
  const machineRAM = machineForm.querySelector('input[placeholder="Memória (em GB)"]').value;
  const machineHD = machineForm.querySelector('input[placeholder="Armazenamento (em GB)"]').value;

  const row = document.createElement('tr');
  row.innerHTML = `<td>${machineName}</td><td>${machineIP}</td><td>${machineRAM}</td><td>${machineHD}</td>`;
  machineList.appendChild(row);

  // Adicionar máquina ao select
  const option = document.createElement('option');
  option.value = machineName;
  option.textContent = `${machineName} (${machineIP})`;
  machineSelect.appendChild(option);

  // Adicionar máquina ao select de ping
  const pingOption = document.createElement('option');
  pingOption.value = machineName;
  pingOption.textContent = `${machineName} (${machineIP})`;
  pingMachineSelect.appendChild(pingOption);

  machineForm.reset();
  const configModal = bootstrap.Modal.getInstance(document.getElementById('configModal'));
  configModal.hide();
});

// Simulação de dados em tempo real
setInterval(() => {
  const selectedMachine = machineSelect.value;
  if (selectedMachine) {
    const cpuUsage = Math.floor(Math.random() * 100);
    const memoryUsage = Math.floor(Math.random() * 100);

    document.getElementById('cpuUsage').textContent = `${cpuUsage}%`;
    document.getElementById('memoryUsage').textContent = `${memoryUsage}%`;
  } else {
    document.getElementById('cpuUsage').textContent = 'N/A';
    document.getElementById('memoryUsage').textContent = 'N/A';
  }
}, 2000);

// Exibir monitoramento apenas quando uma máquina for selecionada
document.getElementById('monitoramentoModal').addEventListener('show.bs.modal', () => {
  const selectedMachine = machineSelect.value;
  if (selectedMachine) {
    document.getElementById('cpuUsage').parentElement.parentElement.style.display = 'table-row';
    document.getElementById('memoryUsage').parentElement.parentElement.style.display = 'table-row';
  } else {
    document.getElementById('cpuUsage').parentElement.parentElement.style.display = 'none';
    document.getElementById('memoryUsage').parentElement.parentElement.style.display = 'none';
  }
});

// Adicionar opção nula ao select de máquinas
document.addEventListener('DOMContentLoaded', () => {
  const nullOption = document.createElement('option');
  nullOption.value = '';
  nullOption.textContent = 'Nenhuma';
  machineSelect.insertBefore(nullOption, machineSelect.firstChild);

  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    document.getElementById('loggedInUser').textContent = loggedInUser.toUpperCase();
  }
});

// Adicionar máquinas ao select de ping
document.getElementById('redeModal').addEventListener('show.bs.modal', () => {
  const pingMachineSelect = document.getElementById('pingMachineSelect');
  pingMachineSelect.innerHTML = ''; // Limpar opções existentes

  const nullOption = document.createElement('option');
  nullOption.value = '';
  nullOption.textContent = 'Nenhuma';
  pingMachineSelect.appendChild(nullOption);

  machineList.querySelectorAll('tr').forEach(row => {
    const machineName = row.children[0].textContent;
    const machineIP = row.children[1].textContent;
    const option = document.createElement('option');
    option.value = `${machineName} (${machineIP})`;
    option.textContent = `${machineName} (${machineIP})`;
    pingMachineSelect.appendChild(option);
  });
});

// Lógica para o teste de ping
document.getElementById('pingButton').addEventListener('click', () => {
  const pingMachineSelect = document.getElementById('pingMachineSelect'); // Certifique-se de que o seletor é o correto
  const selectedMachine = pingMachineSelect.value;

  if (selectedMachine) {
    simulatePing(selectedMachine); // Função já existente para simular o ping
  } else {
    alert('Por favor, selecione uma máquina para testar o ping.');
  }
});

// Função para simular o teste de ping
function simulatePing(machine) {
  const redeModalBody = document.getElementById('redeModal').querySelector('.modal-body');
  
  // Limpa resultados anteriores
  const existingPingResults = redeModalBody.querySelectorAll('.alert');
  existingPingResults.forEach(result => result.remove());

  // Mostra a mensagem inicial de teste
  const pingResultDiv = document.createElement('div');
  pingResultDiv.className = 'alert alert-info mt-3';
  pingResultDiv.textContent = `Iniciando teste de ping para a máquina: ${machine}...`;
  redeModalBody.appendChild(pingResultDiv);

  // Simula o teste de ping com um atraso de 2 segundos
  setTimeout(() => {
    const success = Math.random() > 0.2; // 80% de chance de sucesso
    if (success) {
      pingResultDiv.className = 'alert alert-success mt-3';
      pingResultDiv.textContent = `Ping para a máquina ${machine} bem-sucedido!`;
    } else {
      pingResultDiv.className = 'alert alert-danger mt-3';
      pingResultDiv.textContent = `Falha no ping para a máquina ${machine}.`;
    }
  }, 2000);
}

// Lógica para exibir a seleção de máquina ao clicar no botão "Teste de ping"
document.getElementById('pingButton').addEventListener('click', () => {
  const pingMachineSelectContainer = document.getElementById('pingMachineSelectContainer');
  pingMachineSelectContainer.style.display = 'block';

  const pingMachineSelect = document.getElementById('pingMachineSelect');
  pingMachineSelect.innerHTML = ''; // Limpar opções existentes

  const nullOption = document.createElement('option');
  nullOption.value = '';
  nullOption.textContent = 'Nenhuma';
  pingMachineSelect.appendChild(nullOption);

  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.username;
    option.textContent = user.username;
    pingMachineSelect.appendChild(option);
  });
});

// Lógica para iniciar o teste de ping
document.getElementById('startPingTest').addEventListener('click', () => {
  const selectedMachine = document.getElementById('pingMachineSelect').value;
  if (selectedMachine) {
    alert(`Teste de ping iniciado para a máquina: ${selectedMachine}`);
    // Aqui você pode adicionar a lógica real de teste de ping
  } else {
    alert('Por favor, selecione uma máquina para testar o ping.');
  }
});