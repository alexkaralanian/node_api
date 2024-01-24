const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log('Hello World');
  res.status(200).json({ message: 'hello world' });
});

module.exports = app;
