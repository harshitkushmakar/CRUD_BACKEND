// server.js (main file)
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User = require('./db/user.js');  
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Root route
// Add this to your server.js file
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).send("Error fetching users: " + error.message);
    }
});

// Create user route
app.post('/users', async (req, res) => {
    try {
        console.log("Request body received:", req.body);

        // Create a new user with the data in the request body
        const user = new User({
            id: req.body.id,
            name: req.body.name,
            gender: req.body.gender
        });

        console.log("New user created:", user);

        await user.save();
        console.log("User saved successfully");

        res.send(user); // Return the created user as a response
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).send("Error saving user: " + error.message);
    }
});

// Connect to MongoDB
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017', { dbName: "Usersdb" });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if connection fails
    }
}

connect();

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});