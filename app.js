const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Database configuration
const db = mysql.createConnection({
  host: 'database-1.cxpuz69zcaar.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Aman1234',
  database: 'rds_node_app',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', (req, res) => {
  const { username, email, password, firstName, lastName, phone, address, city, country, zipcode } = req.body;
  const query = 'INSERT INTO registration (name, email, password, firstName, lastName, phone, address, city, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [username, email, password, firstName, lastName, phone, address, city, country, zipcode], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.send('Error registering user.');
    } else {
      console.log('User registered successfully:', result);
      res.redirect('/success');
    }
  });
});


// Route for the success page
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/views/success.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
