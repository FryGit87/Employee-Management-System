const { prompt } = require("inquirer");
const asciiLogo = require("asciiart-logo");
const cTable = require("console.table");
const db = require("./db");
const mysql = require("mysql2");
require("dotenv").config();
const dotenv = require("dotenv");
