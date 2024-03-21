const express = require('express');
const app = express();
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let jsonData = require('./data/data.json');

// Create operation
app.post('/create', (req, res) => {
    const newData = req.body;
    jsonData.push(newData);
    updateData();
    res.json({ message: 'Data created successfully', data: newData });
});

// Read operation
app.get('/read', (req, res) => {
    res.json(jsonData);
});

// Update operation
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const index = jsonData.findIndex(item => item.id === id);
    if (index !== -1) {
        jsonData[index] = { ...jsonData[index], ...newData };
        updateData();
        res.json({ message: 'Data updated successfully', data: jsonData[index] });
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// Delete operation
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = jsonData.findIndex(item => item.id === id);
    if (index !== -1) {
        const deletedData = jsonData.splice(index, 1);
        updateData();
        res.json({ message: 'Data deleted successfully', data: deletedData });
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// Function to update data.json file
function updateData() {
    fs.writeFile('./data/data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error('Error updating data.json:', err);
        } else {
            console.log('Data.json updated successfully');
        }
    });
}

app.listen(3005, () => {
    console.log('Server is running on port 3000');
});
