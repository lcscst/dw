import { pingMachine } from "./api.js";

export function setupPingButton() {
  document.getElementById('pingButton').addEventListener('click', async () => {
    const selectedMachine = document.getElementById('pingMachineSelect').value;
    const resultDiv = document.getElementById('pingResult');

    if (selectedMachine) {
      resultDiv.textContent = `Iniciando teste de ping para a máquina: ${selectedMachine}...`;
      resultDiv.className = 'alert alert-info';

      try {
        const response = await pingMachine(selectedMachine);

        if (response.isAlive) {
          resultDiv.className = 'alert alert-success mt-3';
          resultDiv.textContent = `Ping para a máquina ${selectedMachine} bem-sucedido!`;

          setTimeout(() => {
            resultDiv.textContent = '';
            resultDiv.className = '';
          }, 2000);

        } else {
          resultDiv.className = 'alert alert-danger mt-3';
          resultDiv.textContent = `Falha no ping para a máquina ${selectedMachine}.`;

          setTimeout(() => {
            resultDiv.textContent = '';
            resultDiv.className = '';
          }, 2000);
        }
      } catch (error) {
        resultDiv.className = 'alert alert-danger mt-3';
        resultDiv.textContent = `Erro ao testar o ping para a máquina ${selectedMachine}.`;

        setTimeout(() => {
          resultDiv.textContent = '';
          resultDiv.className = '';
        }, 2000);
      }
    }
  });
}