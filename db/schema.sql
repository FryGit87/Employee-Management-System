
DROP DATABASE IF EXISTS employee_DB; --removes database if exists
CREATE DATABASE employee_DB; --creates a new databse
USE employee_DB; --selects the newly created database


--Department Table
CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL,
);

--Role Table
CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DEC NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

--Employee Table
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT NULL,
);