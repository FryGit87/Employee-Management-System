const express = require("express");
const inquire = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
const mysql = require("mysql2");
const res = require("express/lib/response");
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
          allEmployees();
          break;

        case "Add Employee.":
          // addEmployee();
          break;

        case "Update Employee Role.":
          updateEmpRole();
          break;

        case "View All Roles.":
          allRoles();
          break;

        case "Add Role.":
          addRoles();
          break;

        case "View All Departments.":
          allDepartments();
          break;

        case "Add Department.":
          addDepartment();
          break;

        case "Exit.":
          db.end();
          break;
      }
    });
}

function allEmployees() {
  const sql = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    title,
    dep_name AS department,
    salary,
    CONCAT(e.first_name," ",e.last_name) AS manager
    FROM employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN employee e
    ON employee.manager_id = e.id
    ORDER BY employee.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table(res);
      runInquire();
    }
  });
}

function addEmployee() {
  //TO DO
}

function updateEmpRole() {
  db.query(`SELECT * FROM employee`, (err, employee_res) => {
    if (err) throw err;
    db.query(`SELECT * FROM roles`, (err, role_res) => {
      if (err) throw err;
      inquire
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select the employee to update.",
            choices: () =>
              employee_res.map(
                (employee_res) =>
                  employee_res.first_name + " " + employee_res.last_name
              ),
          },
          {
            name: "role",
            type: "list",
            message: "What is their new role?",
            choices: () => role_res.map((role_res) => role_res.title),
          },
        ])
        .then((ans) => {
          const roleID = role_res.filter(
            (role_res) => role_res.title === ans.role
          )[0].id;
          const employID = employee_res.filter(
            (employee_res) =>
              employee_res.first_name + " " + employee_res.last_name ===
              ans.employee
          )[0].id;
          db.query(
            `UPDATE employee SET ? WHERE ?`,
            [
              {
                role_id: roleID,
              },
              {
                id: employID,
              },
            ],
            function (err) {
              if (err) throw err;
              console.log(`${ans.employee} role updated.`);
              runInquire();
            }
          );
        });
    });
  });
}

function allRoles() {
  const sql = `SELECT 
    roles.id,
    roles.title, 
    department.dep_name AS Department,
    roles.salary
    FROM roles
    INNER JOIN department ON roles.department_id = department.id`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table(res);
      runInquire();
    }
  });
}

function addRoles() {
  db.query(`SELECT DISTINCT * FROM department`, (err, res) => {
    if (err) throw err;
    inquire
      .prompt([
        {
          name: "role",
          type: "input",
          message: "Add a role.",
        },
        {
          name: "salary",
          type: "input",
          message: "Salary of the role.",
        },
        {
          name: "department",
          type: "list",
          message: "Select a department to add this role to:",
          choices: () => res.map((res) => res.dep_name),
        },
      ])
      .then(function (ans) {
        const departmentID = res.filter(
          (res) => res.dep_name === ans.department
        )[0].id;
        db.query(
          "INSERT INTO roles SET ?",
          {
            title: ans.role,
            salary: ans.salary,
            department_id: departmentID,
          },
          function (err) {
            if (err) throw err;
            console.log(`${ans.role} added to ${ans.department}.`);
            runInquire();
          }
        );
      });
  });
}

function allDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table(res);
      runInquire();
    }
  });
}

function addDepartment() {
  inquire
    .prompt({
      name: "newDep",
      type: "input",
      message: "Add new department.",
    })
    .then(function (ans) {
      db.query(`INSERT INTO department SET ?`, {
        dep_name: ans.newDep,
      });
      const sql = "SELECT * FROM department";
      db.query(sql, function (err, res) {
        if (err) throw err;
        console.log(`Created ${ans.newDep} Department`);
        console.table(res);
        runInquire();
      });
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
