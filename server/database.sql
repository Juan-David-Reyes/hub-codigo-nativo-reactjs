-- Base de datos para Código Nativo
CREATE DATABASE IF NOT EXISTS codigo_nativo;
USE codigo_nativo;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  status ENUM('active', 'inactive') DEFAULT 'active',
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Tabla de sitios/proyectos
CREATE TABLE IF NOT EXISTS sites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(500),
  cms VARCHAR(100),
  status ENUM('active', 'inactive') DEFAULT 'active',
  icon_url VARCHAR(500),
  client_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_client (client_id)
);

-- Relación usuarios-clientes
CREATE TABLE IF NOT EXISTS client_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_client_user (client_id, user_id),
  INDEX idx_user (user_id)
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10, 2),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug)
);

-- Servicios del cliente
CREATE TABLE IF NOT EXISTS client_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  service_id INT NOT NULL,
  start_date DATE,
  end_date DATE,
  status ENUM('activo', 'pausado', 'vencido') DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_client (client_id),
  INDEX idx_status (status)
);

-- Tabla de mantenimiento
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_id INT NOT NULL,
  version VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_site (site_id),
  INDEX idx_created_at (created_at)
);

-- Insertar usuario admin por defecto (contraseña: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Administrador', 'admin@codigonativo.com', '$2a$10$8.2K5yP5Y5Y5Y5Y5Y5Y5YeO8JYvKQJYvKQJYvKQJYvKQJYvKQJYvK', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar servicios básicos
INSERT INTO services (name, description, slug, price, status) VALUES
('Mantenimiento web', 'Soporte y mantenimiento continuo del sitio web', 'mantenimiento-web', 50.00, 'active'),
('Backup', 'Copias de seguridad automáticas', 'backup', 20.00, 'active'),
('Seguridad', 'Monitoreo y protección del sitio', 'seguridad', 30.00, 'active'),
('Optimización', 'Optimización de rendimiento y velocidad', 'optimizacion', 40.00, 'active'),
('SEO', 'Optimización para motores de búsqueda', 'seo', 60.00, 'active')
ON DUPLICATE KEY UPDATE id=id;
