// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8