export function validatePassword(password) {
  let strength = 'Fraca';
  
  if (password.length >= 8) {
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      strength = 'Forte';
    } 
    else if (/[A-Z]/.test(password) || /[a-z]/.test(password) || /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) {
      strength = 'Média';
    }
  }
  
  return strength;
}

document.getElementById('passwordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const password = document.getElementById('passwordInput').value;
  const strengthDiv = document.getElementById('passwordStrength');
  
  let strength = validatePassword(password);

  strengthDiv.textContent = `Força da senha: ${strength}`;
  
  strengthDiv.className = `alert ${strength === 'Forte' ? 'alert-success' : strength === 'Média' ? 'alert-warning' : 'alert-danger'}`;
});
