-- schema.sql
CREATE USER IF NOT EXISTS 'michimejia'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON blog_michi.* TO 'michimejia'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS blog_michi;

-- Usar la base de datos
USE blog_michi;

-- Crear la tabla de blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  team VARCHAR(100),
  goals_scored INT,
  image_base64 TEXT
);

