fetch('/api/usuarios')
  .then(response => response.json())
  .then(data => {
    const ul = document.getElementById('lista-usuarios');
    data.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.nombre} (${user.email})`;
      ul.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error cargando usuarios:', error);
  });
