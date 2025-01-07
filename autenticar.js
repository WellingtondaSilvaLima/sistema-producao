const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'simplo' && password === 'Qazujm@1092') {
    sessionStorage.setItem('isAuthenticated', 'true');
    window.location.href = 'home.html';
  } else {
    window.alert('Credenciais inválidas!')
  }
});