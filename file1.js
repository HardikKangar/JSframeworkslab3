const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Group names: [Add your group names here]');
});

app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
