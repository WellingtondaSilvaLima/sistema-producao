 // Verifica se o usuário está autenticado
 if (sessionStorage.getItem('isAuthenticated') !== 'true') {
  alert('Você precisa fazer login para acessar esta página.');
  window.location.href = 'index.html'; // Redireciona para o login
}