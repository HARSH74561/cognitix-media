const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON (if needed)
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Basic validation: check all fields are provided
  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required.');
  }

  // Create a log entry string with subject included
  const logEntry = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n-----------------------\n`;

  // Append the log entry to a file (contact_logs.txt)
  fs.appendFile(path.join(__dirname, 'contact_logs.txt'), logEntry, (err) => {
    if (err) {
      console.error('Error writing log:', err);
      return res.status(500).send('Error processing your message.');
    }
    console.log('New message logged.');
    res.send('your mail is recieved ,our team will contact your shortly');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
