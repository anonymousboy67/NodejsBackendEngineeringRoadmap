const fs = require('fs');
const path = require('path');

// Read file asynchronously
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
    if (err) throw err;
    console.log('File saved!');
});