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


router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/', (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;
    
    // Validation
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        error: 'Name, category, and price are required'
      });
    }
    
    const products = getProducts();
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name,
      category,
      price: parseFloat(price),
      description: description || '',
      stock: parseInt(stock) || 0
    };
    
    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;