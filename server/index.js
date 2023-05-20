const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const ProductRoute = require('../dist/routes/Product.js');
const app = express();

dotenv.config({path: '../.env'});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', ProductRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


