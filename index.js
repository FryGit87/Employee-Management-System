const express = require("express");
const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
// const db = require("./db");
const conn = require("./conn");

require("dotenv").config();

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

conn.connect(function (err) {
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
            function allEmployees();
          break;

        case "Add Employee.":
            function addEmployee();
          break;

        case "Update Employee Role.":
            function updateEmpRole();
          break;

        case "View All Roles.":
            function allRoles();
          break;

        case "Add Role.":
            function addRoles();
          break;

        case "View All Departments.":
            function allDepartments();
          break;

        case "Add Department.":
            function addDepartment();
          break;

        case "Exit.":
            function quit();
          break;
      }
    });
}

function allEmployees() {}

function addEmployee() {}

function updateEmpRole() {}

function allRoles() {}

function addRoles() {}

function allDepartments() {}

function addDepartment() {}

function quit() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
