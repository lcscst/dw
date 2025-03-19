import { getMachines, createMachine } from "./api.js";

const machineForm = document.getElementById('deviceForm');
const machineList = document.getElementById('machineList');
const machineSelect = document.getElementById('machineSelect');
const pingMachineSelect = document.getElementById('pingMachineSelect');

export async function loadPreRegisteredMachines() {
  const machines = await getMachines();

  machines.forEach(machine => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${machine.name}</td><td>${machine.ip}</td><td>${machine.ram}</td><td>${machine.hd}</td>`;
    machineList.appendChild(row);

    const option = document.createElement('option');
    option.value = machine.name;
    option.textContent = `${machine.name} (${machine.ip})`;
    machineSelect.appendChild(option);

    const pingOption = document.createElement('option');
    pingOption.value = machine.ip;
    pingOption.textContent = `${machine.name} (${machine.ip})`;
    pingMachineSelect.appendChild(pingOption);
  });
}

export function setupMachineForm() {
  machineForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const machineName = machineForm.querySelector('input[placeholder="Nome do Dispositivo"]').value;
    const machineIP = machineForm.querySelector('input[placeholder="IP do Dispositivo"]').value;
    const machineRAM = machineForm.querySelector('input[placeholder="Memória (em GB)"]').value;
    const machineHD = machineForm.querySelector('input[placeholder="Armazenamento (em GB)"]').value;

    const userId = localStorage.getItem('loggedUserId');

    const newMachine = {
      userId: userId,
      name: machineName,
      ip: machineIP,
      ram: machineRAM,
      hd: machineHD,
    };

    try {
      const createdMachine = await createMachine(newMachine);

      const row = document.createElement('tr');
      row.innerHTML = `<td>${createdMachine.name}</td><td>${createdMachine.ip}</td><td>${createdMachine.ram}</td><td>${createdMachine.hd}</td>`;
      machineList.appendChild(row);

      const option = document.createElement('option');
      option.value = createdMachine.name;
      option.textContent = `${createdMachine.name} (${createdMachine.ip})`;
      machineSelect.appendChild(option);

      const pingOption = document.createElement('option');
      pingOption.value = createdMachine.name;
      pingOption.textContent = `${createdMachine.name} (${createdMachine.ip})`;
      pingMachineSelect.appendChild(pingOption);

      machineForm.reset();

      const configModal = bootstrap.Modal.getInstance(document.getElementById('configModal'));
      configModal.hide();
    } catch (error) {
      console.error('Erro ao criar a máquina:', error);
      alert('Ocorreu um erro ao salvar a máquina. Tente novamente.');
    }
  });
}
