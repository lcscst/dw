export function setupMonitoramentoModal() {
  document.getElementById('monitoramentoModal').addEventListener('show.bs.modal', async () => {
    const selectedMachine = document.getElementById('machineSelect').value;
    
    const cpuRow = document.getElementById('cpuUsage').parentElement.parentElement;
    const memoryRow = document.getElementById('memoryUsage').parentElement.parentElement;

    const cpuUsage = document.getElementById('cpuUsage');
    const memoryUsage = document.getElementById('memoryUsage');

    console.log(selectedMachine);

    if (selectedMachine) {
      cpuRow.style.display = 'table-row';
      memoryRow.style.display = 'table-row';

      const cpuUsageValue = Math.random() * 100;
      const memoryUsageValue = Math.random() * 100;

      cpuUsage.innerText = `${cpuUsageValue.toFixed(2)}%`;
      memoryUsage.innerText = `${memoryUsageValue.toFixed(2)}%`;
    } else {
      cpuRow.style.display = 'none';
      memoryRow.style.display = 'none';
    }
  });
}