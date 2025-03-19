export function setupCryptoForm() {
  document.getElementById('cryptoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const password = document.getElementById('cryptoInput').value;
    const resultDiv = document.getElementById('cryptoResult');
    const shift = 3;

    const encryptedPassword = password.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let shiftedCode = code + shift;

        if (char >= 'A' && char <= 'Z') {
          if (shiftedCode > 'Z'.charCodeAt(0)) {
            shiftedCode = shiftedCode - 26;
          }
        } else if (char >= 'a' && char <= 'z') {
          if (shiftedCode > 'z'.charCodeAt(0)) {
            shiftedCode = shiftedCode - 26;
          }
        }

        return String.fromCharCode(shiftedCode);
      }
      return char;
    }).join('');

    resultDiv.textContent = `Senha criptografada: ${encryptedPassword}`;
    
    resultDiv.className = 'alert alert-info'; 
  });
}
