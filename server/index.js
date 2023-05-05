const express = requrie('express');
const app = express();
const port = 3000;
const ProductRoute = require('./routes/Product.js');

app.use('/products', ProductRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

a
