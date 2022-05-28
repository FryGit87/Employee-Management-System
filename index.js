const express = require("express");
const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
const mysql = require("mysql2");
// const db = require("./db");
// const conn = require("./conn");
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
    user: "root",
    password: "3cryp+y0uRD2+@$oN!",
    database: "staff_system_db",
  },
  console.log(`Connected to the staff_system_db database.`)
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
  runInquire();
});

// Use inquirer to get user input
function runInquire() {
  inquire
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
          // allEmployees();
          break;

        case "Add Employee.":
          // addEmployee();
          break;

        case "Update Employee Role.":
          // updateEmpRole();
          break;

        case "View All Roles.":
          // allRoles();
          break;

        case "Add Role.":
          // addRoles();
          break;

        case "View All Departments.":
          allDepartments();
          break;

        case "Add Department.":
          // addDepartment();
          break;

        case "Exit.":
          // conn.end();
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

function addEmployee() {
  db.query;
  inquire
    .prompt([
      {
        type: "input",
        message: "What is your first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is your last name?",
        name: "last_name",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: [
          "Sales Lead.",
          "Salesperson.",
          "Lead Engineer.",
          "Software Engineer.",
          "Account Manager.",
          "Accountant.",
          "Legal Team Lead.",
          "Lawyer.",
        ],
      },
      {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
        choices: [
          "None.",
          "John Doe.",
          "Ashley Rodriguez.",
          "Kunal Singh.",
          "Sarah Lourd.",
        ],
      },
    ])
    .then((response) =>
      response.confirm === response.password
        ? console.log("Success!")
        : console.log("You forgot your password already?!")
    );
}

function updateEmpRole() {}

function allRoles() {
  const sql = `SELECT 
    roles.id,
    roles.title, 
    department.dep_name AS Department,
    roles.salary
    FROM roles
    INNER JOIN department ON roles.department_id = department.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    runInquire();
  });
}

function addRoles() {}

function allDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    runInquire();
  });
}

function addDepartment() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
