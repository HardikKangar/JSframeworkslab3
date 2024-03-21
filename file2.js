const express = require('express');
const app = express();
const jsonData = require('./data/data.json');

app.get('/json', (req, res) => {
    res.json(jsonData);
});

app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
