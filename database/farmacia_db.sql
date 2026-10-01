CREATE DATABASE IF NOT EXISTS farmacia_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE farmacia_db;
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL,
    cargo VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio FLOAT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    fecha_vencimiento DATE NOT NULL,
    categoria_id INT NOT NULL,
    CONSTRAINT fk_medicamentos_categorias FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- ---------

INSERT INTO categorias (id, nombre) VALUES
(1, 'Analgésicos'),
(2, 'Antibióticos'),
(3, 'Antiinflamatorios'),
(4, 'Antialérgicos'),
(5, 'Vitaminas y Suplementos')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

INSERT INTO empleados (id, nombre, apellido, dni, email, cargo) VALUES
(1, 'Carlos', 'González', '35123456', 'carlos.gonzalez@farmacia.com', 'Farmacéutico'),
(2, 'Mariana', 'López', '38987654', 'mariana.lopez@farmacia.com', 'Atención al Cliente'),
(3, 'Lucas', 'Fernández', '40555666', 'lucas.fernandez@farmacia.com', 'Cajero'),
(4, 'Sofía', 'Martínez', '37444333', 'sofia.martinez@farmacia.com', 'Repositora'),
(5, 'Agustín', 'Pérez', '36222111', 'agustin.perez@farmacia.com', 'Encargado de Turno')
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO medicamentos (id, nombre, precio, stock, fecha_vencimiento, categoria_id) VALUES
(1, 'Ibuprofeno 400mg', 3200.50, 45, '2027-05-15', 3),
(2, 'Paracetamol 500mg', 2800.00, 60, '2026-11-20', 1),
(3, 'Amoxicilina 500mg', 6500.00, 30, '2026-12-01', 2),
(4, 'Loratadina 10mg', 3900.00, 25, '2027-03-10', 4),
(5, 'Vitamina C 1000mg', 4500.00, 40, '2027-08-30', 5),
(6, 'Diclofenac 75mg', 4100.00, 35, '2026-10-18', 3),
(7, 'Dipirona 500mg', 2600.00, 50, '2027-01-25', 1),
(8, 'Azitromicina 500mg', 7800.00, 20, '2026-09-15', 2),
(9, 'Cetirizina 10mg', 4200.00, 18, '2027-04-12', 4),
(10, 'Complejo B', 5300.00, 32, '2027-06-22', 5)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);