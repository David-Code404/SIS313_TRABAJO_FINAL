const API_URL = '/api/usuarios';

const formulario = document.getElementById('form-usuario');
const tablaBody = document.querySelector('#tabla-usuarios tbody');
const cancelarBtn = document.getElementById('cancelar');

let editando = false;
let usuarioEditandoId = null;

// Función para cargar usuarios
async function cargarUsuarios() {
  const res = await fetch(API_URL);
  const usuarios = await res.json();

  tablaBody.innerHTML = '';
  usuarios.forEach(({ id, nombre, email }) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${email}</td>
      <td>
        <button class="accion edit" data-id="${id}">Editar</button>
        <button class="accion delete" data-id="${id}">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

// Función para crear usuario
async function crearUsuario(nombre, email, password) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
}

// Función para actualizar usuario
async function actualizarUsuario(id, nombre, email, password) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
}

// Función para eliminar usuario
async function eliminarUsuario(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}

// Manejar envío del formulario
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!nombre || !email || !password) {
    alert('Por favor llena todos los campos');
    return;
  }

  if (editando) {
    await actualizarUsuario(usuarioEditandoId, nombre, email, password);
    editando = false;
    usuarioEditandoId = null;
    cancelarBtn.classList.add('hidden');
  } else {
    await crearUsuario(nombre, email, password);
  }

  formulario.reset();
  cargarUsuarios();
});

// Cancelar edición
cancelarBtn.addEventListener('click', () => {
  editando = false;
  usuarioEditandoId = null;
  formulario.reset();
  cancelarBtn.classList.add('hidden');
});

// Delegar eventos para botones Editar y Eliminar
tablaBody.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit')) {
    const id = e.target.dataset.id;

    // Traer datos actuales del usuario
    const res = await fetch(`${API_URL}`);
    const usuarios = await res.json();
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
      document.getElementById('nombre').value = usuario.nombre;
      document.getElementById('email').value = usuario.email;
      document.getElementById('password').value = usuario.password || ''; // Nota: mejor no enviar password visible
      usuarioEditandoId = id;
      editando = true;
      cancelarBtn.classList.remove('hidden');
    }
  }

  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  }
});

// Cargar usuarios al iniciar la página
cargarUsuarios();
