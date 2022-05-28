const express = require("express");
const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3306;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = require("./connection");

connection.connect(function (err) {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
