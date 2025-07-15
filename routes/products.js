const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsPath = path.join(__dirname, '../data/products.json');

// Helper function to read products
const getProducts = () => {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
};


router.get('/', (req, res) => {
  try {
    let products = getProducts();
    
    const { category } = req.query;
    if (category) {
      products = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;