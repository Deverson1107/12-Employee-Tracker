DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(30) NOT NULL,
  dep_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
)

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kaiju0790'
