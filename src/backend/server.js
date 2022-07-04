// Require needed things
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Configures env variables
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware and parsing json
app.use(cors());
app.use(express.json());

// Database URI from MongoDB ATLAS
const uri = process.env.ATLAS_URI;
// Flags
mongoose.connect(uri);

// Connect
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Require files for use
const recipesRouter = require('./routes/recipes');

// Use the files
app.use('/recipes', recipesRouter);

// Starts the server and listening to a certain port // terminal: nodemon server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});