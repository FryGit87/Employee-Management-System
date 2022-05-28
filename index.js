const express = require("express");
const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
// const db = require("./db");
// const conn = require("./conn");
const mysql = require("mysql2");
// require("dotenv").config();

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the movies_db database.`)
);

db.connect(function (err) {
  if (err) throw err;
  console.log(
    asciiLogo({
      name: "Employee Manager",
      lineChars: 10,
      padding: 3,
      margin: 4,
      borderColor: "grey",
      logoColor: "green",
      textColor: "green",
    }).render()
  );
  runPrompt();
});

// Use inquirer to get user input
function runPrompt() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees.",
        "Add Employee.",
        "Update Employee Role.",
        "View All Roles.",
        "Add Role.",
        "View All Departments.",
        "Add Department.",
        "Exit.",
      ],
    })
    .then(function (userSelected) {
      switch (userSelected.choice) {
        case "View all Employees.":
          // function allEmployees();
          break;

        case "Add Employee.":
          // function addEmployee();
          break;

        case "Update Employee Role.":
          // function updateEmpRole();
          break;

        case "View All Roles.":
          // function allRoles();
          break;

        case "Add Role.":
          // function addRoles();
          break;

        case "View All Departments.":
          // function allDepartments();
          break;

        case "Add Department.":
          // function addDepartment();
          break;

        case "Exit.":
          // function conn.end();
          break;
      }
    });
}

function allEmployees() {
  const sql = `SELECT 
        employee.role_id, 
        employee.first_name, 
        employee.last_name, 
        title, 
        name AS department, 
        salary,
        CONCAT(employee.first_Name,' ',employee.last_name) AS manager
        FROM employee`;
}

function addEmployee() {}

function updateEmpRole() {}

function allRoles() {
  const sql = `SELECT 
        role.id,
        title, 
        department.name AS department,
        salary
        FROM role`;
}

function addRoles() {}

function allDepartments() {
  const sql = `SELECT * FROM department`;
}

function addDepartment() {}

function quit() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
