// Include all needed modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// Mongo database url
const url = "mongodb+srv://antonbystrom:Jg5d6OOq5U9PSK0Q@cluster0.qn71oqr.mongodb.net/"

// Mongo database connection
mongoose.connect(url, { useNewUrlParser: true });

// Create an Express application
const app = express();

app.use(cors()); // CORS-enabled for all origins!

app.use(express.json())

app.use(express.urlencoded({extended: true}))
// Tell express to use express.static, a built-in middleware in Express,
// that serves static files (like images, html, css, js) located in the 
// specified folder (in our case the folder public).
app.use(express.static(path.join(__dirname, 'public')));

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;
      
// Start the server
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

const movies = require("./routes/movies");
const myMovies = require("./routes/myMovies");

app.use('/api/movies', movies);
app.use('/api/my/movies', myMovies);