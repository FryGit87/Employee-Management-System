const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
const db = require("./db");
const mysql = require("mysql2");
require("dotenv").config();
const dotenv = require("dotenv");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    // TODO: Add MySQL password here
    password: "", //password .env?!??!?!
    database: "employee_db", // Database name
  },
  console.log(`Connected to the Database!`)
);

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
          break;

        case "Add Employee.":
          break;

        case "Update Employee Role.":
          break;

        case "View All Roles.":
          break;

        case "Add Role.":
          break;

        case "View All Departments.":
          break;

        case "Add Department.":
          break;

        case "Exit.":
          break;
      }
    });
}
