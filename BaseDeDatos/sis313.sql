-- Crear base de datos
CREATE DATABASE IF NOT EXISTS sis313;
USE sis313;

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO usuarios (nombre, email, password) VALUES
('David', 'david@example.com', '123456'),
('Ana', 'ana@example.com', 'abcdef'),
('Luis', 'luis@example.com', 'qwerty'),
('Maria', 'maria@example.com', 'pass123'),
('Carlos', 'carlos@example.com', 'abc12345'),
('Sofia', 'sofia@example.com', 'mypassword'),
('Jorge', 'jorge@example.com', '1234abcd'),
('Lucia', 'lucia@example.com', 'password1'),
('Miguel', 'miguel@example.com', 'letmein'),
('Elena', 'elena@example.com', 'secret');
