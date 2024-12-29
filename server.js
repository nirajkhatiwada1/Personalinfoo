// server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3306;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',  // Replace with your database host
  user: 'root',       // Your MySQL username
  password: 'position1',       // Your MySQL password
  database: 'personal_info_db' // The name of your database
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API Endpoint to Search for Personal Information
app.get('/search', (req, res) => {
  const { query } = req.query; // Get search query from the URL

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  const sql = `SELECT * FROM personal_info WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
  const searchQuery = `%${query}%`;

  db.query(sql, [searchQuery, searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error querying the database' });
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
