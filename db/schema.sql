DROP DATABASE IF EXISTS staff_system_db;
CREATE DATABASE staff_system_db;

USE staff_system_db;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(30) UNIQUE NOT NULL
);


CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL(12),
  department_id INT,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
);


CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT, 
  manager_id INT,
  FOREIGN KEY (role_id) 
  REFERENCES roles(id)
);