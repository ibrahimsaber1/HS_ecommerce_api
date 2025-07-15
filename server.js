const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/products', productRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'hi from the server.js file ' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});