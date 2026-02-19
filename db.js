// Updated db.js
const mysql = require('mysql2');
require('dotenv').config(); // This is necessary to read your .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'agridirect_db',
  port: process.env.DB_PORT || 3306 // Change to 3306 if XAMPP default is used
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to agridirect_db as id ' + connection.threadId);
});

module.exports = connection;