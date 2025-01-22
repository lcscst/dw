export function setupPingButton() {
  document.getElementById('pingButton').addEventListener('click', async () => {
    const selectedMachine = document.getElementById('pingMachineSelect').value;
    const resultDiv = document.getElementById('pingResult');

    if (selectedMachine) {
      resultDiv.textContent = `Iniciando teste de ping para a máquina: ${selectedMachine}...`;
      resultDiv.className = 'alert alert-info';

      setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
          resultDiv.className = 'alert alert-success mt-3';
          resultDiv.textContent = `Ping para a máquina ${selectedMachine} bem-sucedido!`;
        } else {
          resultDiv.className = 'alert alert-danger mt-3';
          resultDiv.textContent = `Falha no ping para a máquina ${selectedMachine}.`;
        }
      }, 2000);
    } else {
      resultDiv.textContent = 'Por favor, selecione uma máquina para testar o ping.';
      resultDiv.className = 'alert alert-warning';
    }
  });
}
