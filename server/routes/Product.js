const express = require('express');
const router = express.Router();

app.get('/', (req, res) => {
  console.log('product')
});

app.get('/:product_id', (req, res) => {
  console.log('product')
});

app.get('/:product_id/styles', (req, res) => {
  console.log('product')
});

app.get('/:product_id/related', (req, res) => {
  console.log('product')
});

module.exports = router