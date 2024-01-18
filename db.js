// db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dqwood1234!@#$',
  database: 'finddoctor'
});

export default db;
