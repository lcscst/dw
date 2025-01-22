export function setupMonitoramentoModal() {
  document.getElementById('monitoramentoModal').addEventListener('show.bs.modal', async () => {
    const selectedMachine = document.getElementById('machineSelect').value;
    const cpuRow = document.getElementById('cpuUsage').parentElement.parentElement;
    const memoryRow = document.getElementById('memoryUsage').parentElement.parentElement;

    if (selectedMachine) {
      cpuRow.style.display = 'table-row';
      memoryRow.style.display = 'table-row';
    } else {
      cpuRow.style.display = 'none';
      memoryRow.style.display = 'none';
    }
  });
}
