// Import necessary modules
const express = require('express');
const path = require('path');
const petsData = require('./data'); // pets.js is in the same directory

// Create an Express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public', 'index.html'));

// Define a route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define routes

// Route 1: Get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // Send all pets data as response
    res.json(petsData);

});

// Route 2: Retrieve a single pet from the database by name parameter
app.get('/api/v1/pets/name/:name', (req, res) => {
    const petName = req.params.name; // Get the name parameter from the URL
    const pet = petsData.find(pet => pet.name === petName); // Find the pet by name

    if (pet) {
        // If pet is found, send it as response
        res.json(pet);
        console.log(petName);
    } else {
        // If pet is not found, send a 404 error
        res.status(404).json({ message: 'Pet not found' });
    }
});

// Route 3: Retrieve a single pet from the database by owner's name using a query string
app.get('/api/v1/pets/owner/:owner', (req, res) => {
    const ownerName = req.query.owner; // Get the owner parameter from the query string
    const pet = petsData.find(pet => pet.owner === ownerName); // Find the pet by owner's name

    if (pet) {
        // If pet is found, send it as response
        res.json(pet);
    } else {
        // If pet is not found, send a 404 error
        res.status(404).json({ message: 'Pet not found' });
    }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

